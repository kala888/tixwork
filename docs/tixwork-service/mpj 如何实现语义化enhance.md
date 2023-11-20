mpj 如何实现语义化enhance

1. 增加接口 InnerQuery.java
```
@FunctionalInterface
public interface InnerQuery<T> {

    public void apply(T t);
}
```

2.实现enhance查询辅助类 和 实现方法
```
public class SealSlotValueQuery{
    public class InnerSealSlot {

        private MPJLambdaWrapper<SealSlot> query;
        private Builder<SealSlot, SealSlot> builder;

        public InnerSealSlot(MPJLambdaWrapper query, Builder<SealSlot, SealSlot> builder) {
            this.query = query;
            this.builder = builder;
        }

        public InnerSealSlot getSealPart() {
            builder.association(SealPart.class, SealSlot::getSealPart);
            this.query.leftJoin(SealPart.class, SealPart::getId, SealSlot::getSealPart);
            return this;
        }

        public InnerSealSlot getEngineModel() {
            builder.association(EngineModel.class, SealSlot::getEngineModel);
            this.query.leftJoin(EngineModel.class, EngineModel::getId, SealSlot::getEngineModel);
            return this;
        }
    }

    public SealSlotValueQuery selectSealSlot(InnerQuery<InnerSealSlot> innerSealSlot) {
        AtomicReference<Builder<SealSlot, SealSlot>> builder = new AtomicReference<>();
        this.getQuery().selectAssociation(
            SealSlot.class,
            SealSlotValue::getSealSlot,
            t -> {
                builder.set(t);
                return t;
            }
        );
        this.getQuery().leftJoin(SealSlot.class, SealSlot::getId, SealSlotValue::getSealSlot);
        InnerSealSlot inner = new InnerSealSlot(this.getQuery(), builder.get());
        innerSealSlot.apply(inner);
        return this;
    }
}

```

4. 查询使用

```
List<SealSlotValue> list = Q.sealSlotValue()
.selectAll()
.selectSealProduct()
.selectSealSlot(slot -> {
    slot.getSealPart();
    slot.getEngineModel();
})
.query(query -> {
    query.eq(SealSlotValue::getEngine, engine.getId());
}).getList();

```



方案二，简化

 ```
    @Data
    public class InnerQuery<T, F> {

        private MybatisLabel.Builder<T, T> builder;
        private MPJLambdaWrapper<F> query;

        public InnerQuery(MybatisLabel.Builder<T, T> builder, MPJLambdaWrapper<F> query) {
            this.builder = builder;
            this.query = query;
        }
    }

    public SealSlotValueQuery selectSealSlot(InnerQueryFunc<InnerQuery<SealSlot, SealSlotValue>> innerSealSlot) {
        AtomicReference<MybatisLabel.Builder<SealSlot, SealSlot>> builder = new AtomicReference<>();
        this.getQuery().selectAssociation(
            SealSlot.class,
            SealSlotValue::getSealSlot,
            t -> {
                builder.set(t);
                return t;
            }
        );
        this.getQuery().leftJoin(SealSlot.class, SealSlot::getId, SealSlotValue::getSealSlot);
        InnerQuery<SealSlot, SealSlotValue> query = new InnerQuery<>(builder.get(), this.getQuery());
        innerSealSlot.apply(query);
        return this;
    }
```


```
List<SealSlotValue> list = Q.sealSlotValue()
.selectAll()
.selectSealProduct()
.selectSealSlot((inner) -> {
    inner.getBuilder().association(SealPart.class, SealSlot::getSealPart);
    inner.getQuery().leftJoin(SealPart.class, SealPart::getId, SealSlot::getSealPart);
})
.query(query -> {
    query.eq(SealSlotValue::getEngine, engine.getId());
}).getList();
```
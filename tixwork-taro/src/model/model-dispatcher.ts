//1。定义dispatcher，功能类
export class ModelDispatcher {
  callbacks: Record<string, Set<Function>> = {};
  data: Record<string, unknown> = {};
  update = (namespace: string) => {
    if (this.callbacks[namespace]) {
      this.callbacks[namespace].forEach((cb) => {
        try {
          const data = this.data[namespace];
          cb(data);
        } catch (e) {
          cb(undefined);
        }
      });
    }
  };
}

package com.tiandtech.base.domain.dto;

public class EleObject {

    private String id;
    private String title;
    private String brief;

    public EleObject() {
    }

    public EleObject(String id) {
        this.id = id;
    }

    public EleObject(String title, String brief) {
        this.title = title;
        this.brief = brief;
    }

    public EleObject(String id, String title, String brief) {
        this.id = id;
        this.title = title;
        this.brief = brief;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBrief() {
        return brief;
    }

    public void setBrief(String brief) {
        this.brief = brief;
    }
}

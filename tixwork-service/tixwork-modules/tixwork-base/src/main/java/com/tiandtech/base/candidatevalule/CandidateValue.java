package com.tiandtech.base.candidatevalule;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CandidateValue {

    private String id;
    private String title;
    private String brief;
    private Object value;
    private Object extraData;
    private List<CandidateValue> children;

}

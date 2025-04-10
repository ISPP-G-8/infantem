package com.isppG8.infantem.infantem.intake.dto;

import org.springframework.data.jpa.repository.QueryRewriter;
import org.springframework.data.domain.Sort;

public class IntakeQueryRewriter implements QueryRewriter {

    @Override
    public String rewrite(String query, Sort sort) {
        System.out.println(query);
        return query + " LIMIT 1";
    }
}

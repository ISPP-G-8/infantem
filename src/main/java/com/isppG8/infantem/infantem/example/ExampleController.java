package com.isppG8.infantem.infantem.example;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/example")
public class ExampleController {

    @Autowired
    private ExampleService exampleService;

    @GetMapping
    public List<Example> getAllExamples() {
        return exampleService.getAllExamples();
    }
}

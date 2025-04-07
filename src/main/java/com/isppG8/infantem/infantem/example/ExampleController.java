package com.isppG8.infantem.infantem.example;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Example", description = "Gestión de los ejemplos")
@RestController
@RequestMapping("api/v1/example")
public class ExampleController {

    @Autowired
    private ExampleService exampleService;

    @Operation(summary = "Obtener todos los ejemplos",
            description = "Devuelve la lista de todos los ejemplos registrados.") @ApiResponse(responseCode = "200",
                    description = "Lista de ejemplos obtenida exitosamente",
                    content = @Content(schema = @Schema(implementation = Example.class))) @GetMapping
    public List<Example> getAllExamples() {
        return exampleService.getAllExamples();
    }
}

package com.isppG8.infantem.infantem.exceptions;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Exceptions", description = "Manejo de excepciones globales para la API")
@RestControllerAdvice
public class ExceptonHandleController {

    @Operation(summary = "Manejo de excepciones globales",
            description = "Maneja cualquier excepción no controlada en la API.") @ApiResponse(responseCode = "500",
                    description = "Error interno del servidor",
                    content = @Content(schema = @Schema(
                            implementation = ErrorMessage.class))) @ExceptionHandler(Exception.class) @ResponseStatus(
                                    value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<ErrorMessage> globalExceptionHandler(Exception ex, WebRequest request) {
        ErrorMessage message = new ErrorMessage(HttpStatus.INTERNAL_SERVER_ERROR.value(), new Date(), ex.getMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Operation(summary = "Manejo de excepción recurso no encontrado",
            description = "Maneja la excepción cuando un recurso no es encontrado.") @ApiResponse(responseCode = "404",
                    description = "Recurso no encontrado",
                    content = @Content(schema = @Schema(
                            implementation = ErrorMessage.class))) @ExceptionHandler(ResourceNotFoundException.class) @ResponseStatus(
                                    value = HttpStatus.NOT_FOUND)
    public ResponseEntity<ErrorMessage> resourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
        ErrorMessage message = new ErrorMessage(HttpStatus.NOT_FOUND.value(), new Date(), ex.getMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }

    @Operation(summary = "Manejo de excepción recurso no propiedad",
            description = "Maneja la excepción cuando un recurso no pertenece al usuario.") @ApiResponse(
                    responseCode = "403", description = "Recurso no es propiedad del usuario",
                    content = @Content(schema = @Schema(
                            implementation = ErrorMessage.class))) @ExceptionHandler(ResourceNotOwnedException.class) @ResponseStatus(
                                    value = HttpStatus.FORBIDDEN)
    public ResponseEntity<ErrorMessage> resourceNotOwnedException(ResourceNotOwnedException ex, WebRequest request) {
        ErrorMessage message = new ErrorMessage(HttpStatus.FORBIDDEN.value(), new Date(), ex.getMessage(),
                request.getDescription(false));

        return new ResponseEntity<>(message, HttpStatus.FORBIDDEN);
    }

    @Operation(summary = "Manejo de excepción de validación",
            description = "Maneja las excepciones de validación de datos.") @ApiResponse(responseCode = "400",
                    description = "Error de validación de datos",
                    content = @Content(schema = @Schema(
                            implementation = ErrorMessage.class))) @ExceptionHandler(MethodArgumentNotValidException.class) @ResponseStatus(
                                    value = HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorMessage> handleValidationExceptions(MethodArgumentNotValidException ex,
            WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }

        ErrorMessage message = new ErrorMessage(HttpStatus.BAD_REQUEST.value(), new Date(), "Validation failed",
                errors.toString());
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalArgumentException.class) @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorMessage> handleIllegalArgumentException(IllegalArgumentException ex,
            WebRequest request) {
        ErrorMessage message = new ErrorMessage(HttpStatus.BAD_REQUEST.value(), new Date(), ex.getMessage(),
                request.getDescription(false));
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

}

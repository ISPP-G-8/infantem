# Reporte de testing de la clase Allergen

## Testing del servicio AllergenService

### Fecha: 9/03/2025
#### Errores detectados:
- No se lanza una excepción de tipo EntityNotFoundException cuando se intenta buscar un alérgeno que no existe en la base de datos. Se recomienda crear una excepción personalizada para este caso.
- El nombre del alérgeno no es único. Se recomienda añadir una restricción de unicidad en la base de datos. Se recomienda la creación de una excepción personalizada para este caso.
- No se comprueba que el alérgeno a añadir no sea nulo ni vacío. Se recomienda lanzar una excepción de tipo IllegalArgumentException en caso de que el alérgeno sea nulo.
- No se comprueba que el alérgeno a editar exista en la base de datos. Se recomienda lanzar una excepción en dicho caso.
- No se comprueba que el alérgeno a eliminar exista. Se recomienda lanzar una excepción en caso de que el alérgeno no exista.

#### Modificaciones del servicio realizadas:
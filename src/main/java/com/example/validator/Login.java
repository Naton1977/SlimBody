package com.example.validator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Target({ElementType.FIELD, ElementType.METHOD, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = LoginValidation.class)
public @interface Login {
    String message() default "{}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
package com.example.controller;

import com.example.domain.entity.BodyParameters;
import com.example.service.ProductService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/bodyParameters")
public class BodyParametersController {
    private final ProductService productService;

    public BodyParametersController(ProductService productService) {
        this.productService = productService;
    }


    @CrossOrigin
    @GetMapping
    public String index() {
        return "bodyParameters";
    }


    @PostMapping("/save")
    public String save(@Validated @ModelAttribute BodyParameters bodyParameters, BindingResult bindingResult) {
        if(!bindingResult.hasErrors()){
            UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            productService.saveBodyParameters(bodyParameters, principal);
        }
        return "redirect:/diaryPage";
    }

}

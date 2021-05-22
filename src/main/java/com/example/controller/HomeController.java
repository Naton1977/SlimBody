package com.example.controller;

import com.example.domain.entity.DiaryUser;
import com.example.service.ProductService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class HomeController {
    private final ProductService productService;

    public HomeController(ProductService productService) {
        this.productService = productService;
    }


    @GetMapping
    public String goHome() {
        return "home";
    }


    @GetMapping("/article/{id}")
    public String article(@PathVariable int id) {
        if (id == 1) {
            return "articlePage1";
        }
        if (id == 2) {
            return "articlePage2";
        }
        if (id == 3) {
            return "articlePage3";
        }
        if (id == 4) {
            return "articlePage4";
        }
        return "home";
    }

    @GetMapping("/login")
    public String goLogin() {
        return "loginPage";
    }


    @GetMapping("/diaryPage")
    public String goDiaryPage(Model model) {
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        DiaryUser diaryUser = productService.findUserByLogin(principal.getUsername());
        if (diaryUser.getCalorieContent() != 0) {
            long calorie = Math.round(diaryUser.getCalorieContent());
            model.addAttribute("calorieContent", calorie);
        }
        return "diaryPage";
    }
}

package com.example.service;

import com.example.domain.dto.*;
import com.example.domain.entity.*;
import com.example.repository.*;
import org.decimal4j.util.DoubleRounder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductService {
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final DailyDietaryRationRepository dietaryRationRepository;
    private final BodyParametersRepository bodyParametersRepository;
    private final RecipeRepository recipeRepository;
    private final ProductRecipeRepository productRecipeRepository;

    public ProductService(UserRepository userRepository, ProductRepository productRepository, DailyDietaryRationRepository dietaryRationRepository, BodyParametersRepository bodyParametersRepository, RecipeRepository recipeRepository, ProductRecipeRepository productRecipeRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.dietaryRationRepository = dietaryRationRepository;
        this.bodyParametersRepository = bodyParametersRepository;
        this.recipeRepository = recipeRepository;
        this.productRecipeRepository = productRecipeRepository;
    }

    @Autowired
    PasswordEncoder passwordEncoder;


    @Transactional
    public void changeProductData(String newProduct, String productParameter, UserDetails principal) throws SQLException {
        DiaryUser diaryUser = userRepository.userByLogin(principal.getUsername());
        if (diaryUser != null) {

            String columnNumber = productParameter.substring(6, 7);
            int columnNumberInt = 0;
            try {
                columnNumberInt = Integer.parseInt(columnNumber);
            } catch (Exception e) {

            }
            int tdIndex = productParameter.indexOf("td");
            String productId = productParameter.substring(16, tdIndex);
            int productIdInt = 0;
            try {
                productIdInt = Integer.parseInt(productId);
            } catch (Exception e) {

            }

            Set<Product> products = diaryUser.getProductSet();
            for (Product product : products) {
                if (product.getProductId() == productIdInt) {
                    if (columnNumberInt < 6 && productIdInt > 0) {
                        Product prod = productRepository.getOne(productIdInt);
                        Set<DiaryUser> diaryUserSet = prod.getUserSet();
                        if (columnNumberInt == 1) {
                            boolean isPresent = false;
                            Set<Product> productSet = diaryUser.getProductSet();
                            for (Product product1 : productSet) {
                                if (product1.getProductName().equals(newProduct)) {
                                    isPresent = true;
                                    break;
                                }
                            }
                            if (!isPresent) {
                                prod.setProductName(newProduct);
                                productRepository.saveAndFlush(prod);
                            }
                        }
                        if (columnNumberInt == 2) {
                            try {
                                prod.setProteins(Double.parseDouble(newProduct));
                                productRepository.saveAndFlush(prod);
                            } catch (Exception e) {

                            }
                        }
                        if (columnNumberInt == 3) {
                            try {
                                prod.setFats(Double.parseDouble(newProduct));
                                productRepository.saveAndFlush(prod);
                            } catch (Exception e) {

                            }
                        }
                        if (columnNumberInt == 4) {
                            try {
                                prod.setCarbohydrates(Double.parseDouble(newProduct));
                                productRepository.saveAndFlush(prod);
                            } catch (Exception e) {

                            }
                        }
                        if (columnNumberInt == 5) {
                            try {
                                prod.setCalorieContent(Double.parseDouble(newProduct));
                                productRepository.saveAndFlush(prod);
                            } catch (Exception e) {

                            }
                        }
                    }
                }
            }
        }
    }

    public List<Product> findAllProduct() throws SQLException {
        return productRepository.findAll();
    }


    @Transactional
    public Product addNewProduct(Product product) throws SQLException {
        return productRepository.save(product);
    }

    public DiaryUser findUserById(Integer id) throws SQLException {
        return userRepository.getOne(id);
    }

    @Transactional
    public void updateUser(DiaryUser diaryUser) throws SQLException {
        userRepository.saveAndFlush(diaryUser);
    }

    public void deleteProductById(Integer id) throws SQLException {
        productRepository.deleteById(id);
    }

    @Transactional
    public DiaryUser findUserByLogin(String login) {
        DiaryUser diaryUser = userRepository.userByLogin(login);
        if (diaryUser != null) {
            Set<Product> productSet = diaryUser.getProductSet();
            Set<DailyDietaryRation> dailyDietaryRationSet = diaryUser.getDailyDietaryRations();
            for (Product product : productSet) {
                product.getProductName();
                break;
            }
            for (DailyDietaryRation ration : dailyDietaryRationSet) {
                ration.getDateAdded();
                break;
            }
            return diaryUser;
        }
        return null;
    }

    @Transactional
    public void addNewRecordFromDailyDiaryRationTable(NewProductTheDailyDiet newProductTheDailyDiet, UserDetails principal) {
        DiaryUser diaryUser = userRepository.userByLogin(principal.getUsername());
        if (diaryUser != null) {
            Set<Product> products = diaryUser.getProductSet();
            Set<Recipe> recipeSet = diaryUser.getRecipeSet();
            if (newProductTheDailyDiet.getProductCategory().equals("product")) {
                for (Product product : products) {
                    if (product.getProductId() == newProductTheDailyDiet.getProductId()) {
                        Product product1 = productRepository.getOne(product.getProductId());
                        DailyDietaryRation dietaryRation = new DailyDietaryRation();
                        dietaryRation.setDateAdded(newProductTheDailyDiet.getTime());
                        dietaryRation.setProductTitle(product1.getProductName());
                        dietaryRation.setProductProteins(product1.getProteins());
                        dietaryRation.setProductFats(product1.getFats());
                        dietaryRation.setProductCarbohydrates(product1.getCarbohydrates());
                        dietaryRation.setCalorieContent(product1.getCalorieContent());
                        dietaryRation.setProductWeight(newProductTheDailyDiet.getWeight());
                        dietaryRation.addDailyDiaryUserSet(diaryUser);
                        dietaryRationRepository.save(dietaryRation);
                    }
                }
            }
            if (newProductTheDailyDiet.getProductCategory().equals("recipe")) {
                for (Recipe recipe : recipeSet) {
                    if (recipe.getRecipeId() == newProductTheDailyDiet.getProductId()) {
                        Recipe res = recipeRepository.getOne(recipe.getRecipeId());
                        DailyDietaryRation dietaryRation = new DailyDietaryRation();
                        dietaryRation.setDateAdded(newProductTheDailyDiet.getTime());
                        dietaryRation.setProductTitle(res.getRecipeName());
                        dietaryRation.setProductProteins(res.getProteins());
                        dietaryRation.setProductFats(res.getFats());
                        dietaryRation.setProductCarbohydrates(res.getCarbohydrates());
                        dietaryRation.setCalorieContent(res.getCalorieContent());
                        dietaryRation.setProductWeight(newProductTheDailyDiet.getWeight());
                        dietaryRation.addDailyDiaryUserSet(diaryUser);
                        dietaryRationRepository.save(dietaryRation);
                    }
                }
            }
        }
    }

    @Transactional
    public List<DailyDietaryRation> createUserProductDailyDiaryRationList(UserDetails principal) {
        DiaryUser diaryUser = userRepository.userByLogin(principal.getUsername());
        Set<DailyDietaryRation> dailyDietaryRationSet = diaryUser.getDailyDietaryRations();
        List<DailyDietaryRation> dietaryRationList = dailyDietaryRationSet.stream().sorted(Comparator.comparing(DailyDietaryRation::getDateAdded)).collect(Collectors.toList());
        Collections.reverse(dietaryRationList);
        return dietaryRationList;
    }

    @Transactional
    public void saveBodyParameters(BodyParameters bodyParameters, UserDetails principal) {
        DiaryUser diaryUser = userRepository.userByLogin(principal.getUsername());
        bodyParameters.addDiaryUserSet(diaryUser);
        bodyParametersRepository.save(bodyParameters);
    }

    @Transactional
    public void addCalorieContentFromUser(UserDetails principal, Double calorieContent) {
        DiaryUser diaryUser = userRepository.userByLogin(principal.getUsername());
        diaryUser.setCalorieContent(calorieContent);
        userRepository.saveAndFlush(diaryUser);
    }

    @Transactional
    public void addNewRecipe(UserDetails principal, ProductRecipeTransfer productRecipeTransfer) {
        boolean productPresent = false;
        boolean newRecipe = false;
        boolean firstRequest = false;
        ProductRecipe productRecipe = new ProductRecipe();
        Recipe recipe2 = new Recipe();
        Date now = new Date();
        DiaryUser diaryUser = findUserByLogin(principal.getUsername());
        if (diaryUser != null) {
            Set<Product> productSet = diaryUser.getProductSet();
            for (Product prod : productSet) {
                if (prod.getProductId() == productRecipeTransfer.getProductId()) {
                    productPresent = true;
                    productRecipe.setProductRecipeName(prod.getProductName());
                    productRecipe.setProteins(prod.getProteins());
                    productRecipe.setFats(prod.getFats());
                    productRecipe.setCarbohydrates(prod.getCarbohydrates());
                    productRecipe.setCalorieContent(prod.getCalorieContent());
                    productRecipe.setWeightProductRecipe(productRecipeTransfer.getProductWeight());
                }
            }

            ProductRecipe productRecipe1 = productRecipeRepository.save(productRecipe);

            if (productPresent) {
                Set<Recipe> recipes = diaryUser.getRecipeSet();
                if (recipes.size() == 0) {
                    Recipe recipe = new Recipe();
                    recipe.setRecipeName("newRecipe");
                    recipe.setDateAdded(now);
                    recipe.addProductRecipeSet(productRecipe1);
                    Recipe recipe1 = recipeRepository.save(recipe);
                    diaryUser.addRecipeSet(recipe1);
                    userRepository.saveAndFlush(diaryUser);
                    firstRequest = true;
                }

                if (recipes.size() > 0 && !firstRequest) {
                    Set<Recipe> recipeSet = diaryUser.getRecipeSet();
                    for (Recipe res : recipeSet) {
                        if (res.getRecipeName().equals("newRecipe")) {
                            newRecipe = true;
                            recipe2.setRecipeId(res.getRecipeId());
                            recipe2.setRecipeName(res.getRecipeName());
                            recipe2.setProductRecipeSet(res.getProductRecipeSet());
                            recipe2.setDateAdded(res.getDateAdded());
                        }
                    }
                    if (newRecipe) {
                        recipe2.addDiaryUserSet(diaryUser);
                        recipe2.addProductRecipeSet(productRecipe1);
                        recipeRepository.saveAndFlush(recipe2);
                    } else {
                        Recipe recipe = new Recipe();
                        recipe.setRecipeName("newRecipe");
                        recipe.addProductRecipeSet(productRecipe1);
                        recipe.setDateAdded(now);
                        Recipe recipe1 = recipeRepository.save(recipe);
                        diaryUser.addRecipeSet(recipe1);
                        userRepository.saveAndFlush(diaryUser);
                    }
                }
            }
        }
    }


    @Transactional
    public void updateRecipe(UserDetails principal, RecipeTransfer recipeTransfer) {
        double proteins = 0;
        double fats = 0;
        double carbohydrates = 0;
        double calorieContent = 0;
        DiaryUser diaryUser = findUserByLogin(principal.getUsername());
        Set<Recipe> recipes = diaryUser.getRecipeSet();
        Recipe recipe = new Recipe();
        for (Recipe res : recipes) {
            if (res.getRecipeName().equals("newRecipe")) {
                recipe.setRecipeName(recipeTransfer.getRecipeTitle());
                recipe.setRecipeId(res.getRecipeId());
                recipe.addDiaryUserSet(diaryUser);
                recipe.setProductRecipeSet(res.getProductRecipeSet());
                recipe.setDateAdded(res.getDateAdded());
            }
        }

        Set<ProductRecipe> productRecipes = recipe.getProductRecipeSet();
        for (ProductRecipe prodRec : productRecipes) {
            double productWeight = (prodRec.getWeightProductRecipe() / 100);
            proteins += prodRec.getProteins() * productWeight;
            fats += prodRec.getFats() * productWeight;
            carbohydrates += prodRec.getCarbohydrates() * productWeight;
            calorieContent += prodRec.getCalorieContent() * productWeight;
        }

        proteins = proteins / productRecipes.size();
        fats = fats / productRecipes.size();
        carbohydrates = carbohydrates / productRecipes.size();
        calorieContent = calorieContent / productRecipes.size();
        recipe.setProteins(proteins);
        recipe.setFats(fats);
        recipe.setCarbohydrates(carbohydrates);
        recipe.setCalorieContent(calorieContent);
        recipeRepository.saveAndFlush(recipe);
    }

    @Transactional(readOnly = true)
    public List<AllRecipeListTransfer> createAllRecipeList(UserDetails principal) {
        DiaryUser diaryUser = findUserByLogin(principal.getUsername());
        if (diaryUser != null) {
            Set<Recipe> recipes = diaryUser.getRecipeSet();
            List<Recipe> recipeList = recipes.stream().sorted(Comparator.comparing(Recipe::getRecipeName)).collect(Collectors.toList());
            List<AllRecipeListTransfer> allRecipeListTransfers = new ArrayList<>();
            for (Recipe value : recipeList) {
                AllRecipeListTransfer allRecipeListTransfer = new AllRecipeListTransfer();
                allRecipeListTransfer.setRecipeId(value.getRecipeId());
                allRecipeListTransfer.setRecipeName(value.getRecipeName());
                allRecipeListTransfer.setProteins(value.getProteins());
                allRecipeListTransfer.setFats(value.getFats());
                allRecipeListTransfer.setCarbohydrates(value.getCarbohydrates());
                allRecipeListTransfer.setCalorieContent(value.getCalorieContent());
                SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd");
                allRecipeListTransfer.setDateAdded(formatDate.format(value.getDateAdded()));
                Set<ProductRecipe> productRecipesSet = value.getProductRecipeSet();
                List<ProductRecipeDto> productRecipeDtoList = new ArrayList<>();
                for (ProductRecipe prodRec : productRecipesSet) {
                    ProductRecipeDto productRecipeDto = new ProductRecipeDto();
                    productRecipeDto.setProductRecipeId(prodRec.getProductRecipeId());
                    productRecipeDto.setProductRecipeName(prodRec.getProductRecipeName());
                    productRecipeDto.setProteins(productRecipeDto.getProteins());
                    productRecipeDto.setFats(prodRec.getFats());
                    productRecipeDto.setCarbohydrates(prodRec.getCarbohydrates());
                    productRecipeDto.setCalorieContent(prodRec.getCalorieContent());
                    productRecipeDto.setWeightProductRecipe(prodRec.getWeightProductRecipe());
                    productRecipeDtoList.add(productRecipeDto);
                }
                allRecipeListTransfer.setProductRecipes(productRecipeDtoList);

                allRecipeListTransfers.add(allRecipeListTransfer);
            }
            return allRecipeListTransfers;
        }
        return null;
    }

    @Transactional
    public List<UserDailyDietaryRationTransfer> findProductsOnTheSpecifiedDate(UserDetails principal, String date) {
        List<UserDailyDietaryRationTransfer> dailyDietaryRationTransfers = new ArrayList<>();
        List<DailyDietaryRation> dietaryRationList = createUserProductDailyDiaryRationList(principal);
        SimpleDateFormat formatDate = new SimpleDateFormat("dd-M-yyyy");
        for (DailyDietaryRation ration : dietaryRationList) {
            String userDate = formatDate.format(ration.getDateAdded());
            if (userDate.equals(date)) {
                double calorieContent = (ration.getProductWeight() * ration.getCalorieContent() / 100);
                UserDailyDietaryRationTransfer userDailyDietaryRationTransfer = new UserDailyDietaryRationTransfer();
                userDailyDietaryRationTransfer.setId(ration.getId());
                userDailyDietaryRationTransfer.setDateAdded(ration.getDateAdded().toString());
                userDailyDietaryRationTransfer.setProductProteins(Double.toString(DoubleRounder.round(ration.getProductProteins(), 2)));
                userDailyDietaryRationTransfer.setProductFats(Double.toString(DoubleRounder.round(ration.getProductFats(), 2)));
                userDailyDietaryRationTransfer.setProductTitle(ration.getProductTitle());
                userDailyDietaryRationTransfer.setProductCarbohydrates(Double.toString(DoubleRounder.round(ration.getProductCarbohydrates(), 2)));
                userDailyDietaryRationTransfer.setCalorieContent(Double.toString(DoubleRounder.round(calorieContent, 2)));
                userDailyDietaryRationTransfer.setProductWeight(Double.toString(DoubleRounder.round(ration.getProductWeight(), 2)));
                dailyDietaryRationTransfers.add(userDailyDietaryRationTransfer);
            }
        }
        return dailyDietaryRationTransfers;
    }


    @Transactional
    public List<UserDailyDietaryRationTransfer> allDailyRations(UserDetails principal, int path) {
        List<String> userDateList = new ArrayList<>();
        List<DailyDietaryRation> dietaryRationList = createUserProductDailyDiaryRationList(principal);
        Date now = new Date();
        List<UserDailyDietaryRationTransfer> dailyDietaryRationTransfers = new ArrayList<>();
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd");
        String dateNow = formatDate.format(now);
        for (int i = 0; i < dietaryRationList.size() - 1; i++) {
            String userDate = formatDate.format(dietaryRationList.get(i).getDateAdded());
            String userDateFuture = formatDate.format(dietaryRationList.get(i + 1).getDateAdded());
            if (i == 0) {
                userDateList.add(userDate);
            }

            if (!userDate.equals(userDateFuture)) {
                userDateList.add(userDateFuture);
            }
        }
        if (path < 0) {
            path = 0;
        }
        if (userDateList.size() > 0) {
            if (dateNow.equals(userDateList.get(0))) {
                path += 1;
            }
        }

        if (path > (userDateList.size() - 1)) {
            path = (userDateList.size() - 1);
        }

        for (int i = 0; i < dietaryRationList.size(); i++) {
            double calorieContent = (dietaryRationList.get(i).getProductWeight() * dietaryRationList.get(i).getCalorieContent() / 100);
            UserDailyDietaryRationTransfer userDailyDietaryRationTransfer = new UserDailyDietaryRationTransfer();
            String userDate = formatDate.format(dietaryRationList.get(i).getDateAdded());
            if (userDate.equals(userDateList.get(path))) {
                if (path != (userDateList.size() - 1)) {
                    break;
                }
            }
            userDailyDietaryRationTransfer.setId(dietaryRationList.get(i).getId());
            userDailyDietaryRationTransfer.setDateAdded(dietaryRationList.get(i).getDateAdded().toString());
            userDailyDietaryRationTransfer.setProductProteins(Double.toString(DoubleRounder.round(dietaryRationList.get(i).getProductProteins(), 2)));
            userDailyDietaryRationTransfer.setProductFats(Double.toString(DoubleRounder.round(dietaryRationList.get(i).getProductFats(), 2)));
            userDailyDietaryRationTransfer.setProductTitle(dietaryRationList.get(i).getProductTitle());
            userDailyDietaryRationTransfer.setProductCarbohydrates(Double.toString(DoubleRounder.round(dietaryRationList.get(i).getProductCarbohydrates(), 2)));
            userDailyDietaryRationTransfer.setCalorieContent(Double.toString(DoubleRounder.round(calorieContent, 2)));
            userDailyDietaryRationTransfer.setProductWeight(Double.toString(DoubleRounder.round(dietaryRationList.get(i).getProductWeight(), 2)));
            dailyDietaryRationTransfers.add(userDailyDietaryRationTransfer);
        }
        return dailyDietaryRationTransfers;
    }


    @Transactional
    public void createNewProduct(UserDetails principal, NewProductDto newProductDto) {
        boolean isPresent = false;
        Product product = new Product();
        product.setProductName(newProductDto.getProductName());
        try {
            product.setProteins(Double.parseDouble(newProductDto.getProteins()));
            product.setFats(Double.parseDouble(newProductDto.getFats()));
            product.setCarbohydrates(Double.parseDouble(newProductDto.getCarbohydrates()));
            product.setCalorieContent(Double.parseDouble(newProductDto.getCalorieContent()));
            DiaryUser diaryUser = findUserByLogin(principal.getUsername());
            if (diaryUser != null) {
                Set<Product> productSet = diaryUser.getProductSet();
                for (Product prod : productSet) {
                    if (prod.getProductName().equals(product.getProductName())) {
                        isPresent = true;
                        break;
                    }
                }
                if (!isPresent) {
                    Product product1 = addNewProduct(product);
                    product.setProductId(product1.getProductId());
                    diaryUser.addProductSet(product);
                    updateUser(diaryUser);
                }
            }
        } catch (Exception e) {

        }

    }

    @Transactional
    public List<ProductTransfer> productsTabContentJson(UserDetails principal) {
        DiaryUser diaryUser = findUserByLogin(principal.getUsername());
        if (diaryUser != null) {
            Set<Product> productSet = diaryUser.getProductSet();
            List<Product> productList = productSet.stream().sorted(Comparator.comparing(Product::getProductName)).collect(Collectors.toList());
            List<ProductTransfer> productTransfers = new ArrayList<>();
            for (Product product : productList) {
                ProductTransfer productTransfer = new ProductTransfer();
                productTransfer.setProductId(product.getProductId());
                productTransfer.setProductName(product.getProductName());
                productTransfer.setProteins(Double.toString(DoubleRounder.round(product.getProteins(), 2)));
                productTransfer.setFats(Double.toString(DoubleRounder.round(product.getFats(), 2)));
                productTransfer.setCarbohydrates(Double.toString(DoubleRounder.round(product.getCarbohydrates(), 2)));
                productTransfer.setCalorieContent(Double.toString(DoubleRounder.round(product.getCalorieContent(), 2)));
                productTransfers.add(productTransfer);
            }
            return productTransfers;
        }
        return null;
    }

    @Transactional
    public List<ProductTransfer> addProductListForRecipe(UserDetails principal) {
        DiaryUser diaryUser = findUserByLogin(principal.getUsername());
        if (diaryUser != null) {
            List<ProductTransfer> productTransfers = new ArrayList<>();
            Set<Product> productSet = diaryUser.getProductSet();
            Set<Recipe> recipeSet = diaryUser.getRecipeSet();
            if (recipeSet.size() > 0) {
                for (Recipe res : recipeSet) {
                    ProductTransfer productTransfer = new ProductTransfer();
                    productTransfer.setProductId(res.getRecipeId());
                    productTransfer.setProductName(res.getRecipeName());
                    productTransfer.setProteins(Double.toString(DoubleRounder.round(res.getProteins(), 2)));
                    productTransfer.setFats(Double.toString(DoubleRounder.round(res.getFats(), 2)));
                    productTransfer.setCarbohydrates(Double.toString(DoubleRounder.round(res.getCarbohydrates(), 2)));
                    productTransfer.setCalorieContent(Double.toString(DoubleRounder.round(res.getCalorieContent(), 2)));
                    productTransfer.setCategoryProduct("recipe");
                    productTransfers.add(productTransfer);
                }
            }


            for (Product product : productSet) {
                ProductTransfer productTransfer = new ProductTransfer();
                productTransfer.setProductId(product.getProductId());
                productTransfer.setProductName(product.getProductName());
                productTransfer.setProteins(Double.toString(DoubleRounder.round(product.getProteins(), 2)));
                productTransfer.setFats(Double.toString(DoubleRounder.round(product.getFats(), 2)));
                productTransfer.setCarbohydrates(Double.toString(DoubleRounder.round(product.getCarbohydrates(), 2)));
                productTransfer.setCalorieContent(Double.toString(DoubleRounder.round(product.getCalorieContent(), 2)));
                productTransfer.setCategoryProduct("product");
                productTransfers.add(productTransfer);
            }

            return productTransfers.stream().sorted().collect(Collectors.toList());
        }
        return null;
    }

    @Transactional
    public void saveNewUser(UserDto userDto) {
        String password = passwordEncoder.encode(userDto.getUserPassword());
        DiaryUser diaryUser = new DiaryUser();
        diaryUser.setUserLogin(userDto.getUserLogin());
        diaryUser.setUserPassword(password);
        diaryUser.setUserEmail(userDto.getUserEmail());
        diaryUser.setRole("ROLE_USER");
        userRepository.save(diaryUser);

        SecurityContext securityContext = SecurityContextHolder.getContext();
        User principal = new User(diaryUser.getUserLogin(), diaryUser.getUserPassword(), AuthorityUtils.createAuthorityList(diaryUser.getRole()));
        Authentication authentication = new UsernamePasswordAuthenticationToken(principal, principal.getAuthorities());
        securityContext.setAuthentication(authentication);
    }
}


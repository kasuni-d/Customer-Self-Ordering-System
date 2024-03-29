package com.app.restaurant.controller;

import com.app.restaurant.model.Meal;
import com.app.restaurant.service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/meal")
public class MealController {

    @Autowired
    MealService mealService;

    @GetMapping
    public List<Meal> getAllMeals(){
        return mealService.getAllMeals();
    }


    //build create meal REST API
    @PostMapping
    public ResponseEntity<Meal> createMeal(@RequestParam("image") MultipartFile file,
                           @RequestParam("mealName") String mealName,
                           @RequestParam("price") double price,
                           @RequestParam("category") String category,
                           @RequestParam("desc") String description) throws IOException {

        return ResponseEntity.ok(mealService.createMeal(file,mealName,price,category,description));
    }

    //build get meal by id REST API
    @GetMapping("{id}")
    public ResponseEntity<Meal> getMealById(@PathVariable int id){

        return ResponseEntity.ok(mealService.getMealById(id));
    }

    //build update meal REST API
    @PutMapping("{id}")
    public ResponseEntity<Meal> updateMealImage(@PathVariable int id,@RequestParam("image") MultipartFile file,
                                                  @RequestParam("mealName") String mealName,
                                                  @RequestParam("price") double price,
                                                  @RequestParam("category") String category,
                                                  @RequestParam("desc") String description) throws IOException {

//        String imageFileName = StringUtils.cleanPath(file.getOriginalFilename());
//        System.out.println("imagepath "+imageFileName);



        return ResponseEntity.ok( mealService.updateMeal(id,file,mealName,price,category,description));

    }

    // build delete meal REST API
    @DeleteMapping("{id}")
    public ResponseEntity<Map<String,Boolean>> deleteMeal(@PathVariable int id){

        return ResponseEntity.ok(mealService.deleteMeal(id));
    }

}

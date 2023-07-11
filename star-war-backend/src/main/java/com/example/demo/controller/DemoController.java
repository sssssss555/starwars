package com.example.demo.controller;

import com.example.demo.model.People;
import com.example.demo.service.IDemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DemoController {

    @Autowired
    IDemoService demoService;

    @GetMapping("/people")
    public ResponseEntity<People> searchPeople(@RequestParam(name="name")String name) throws CloneNotSupportedException {
            People p = demoService.searchPeople(name);
            if(null == p)
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            return new ResponseEntity<>(p,HttpStatus.OK);
    }
}

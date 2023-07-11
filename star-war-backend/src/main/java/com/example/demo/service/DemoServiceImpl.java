package com.example.demo.service;

import com.example.demo.model.*;
import jakarta.annotation.PostConstruct;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DemoServiceImpl implements IDemoService{


    @Override
    public People searchPeople(String name) throws CloneNotSupportedException {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<SearchResult> searchResult =restTemplate.
                getForEntity("https://swapi.dev/api/people/?search="+name, SearchResult.class);
        List<People> people = searchResult.getBody().getResults();
        People output =null;
        if(null != people && !people.isEmpty()){
            People p = people.get(0);
            output = (People) p.clone();
            if(null != p.getFilms()){
                List<String> films = p.getFilms().stream().map(e-> restTemplate.getForEntity(e, Film.class).getBody()).collect(Collectors.toList())
                        .stream().map(e->e.getTitle()).collect(Collectors.toList());
                output.setFilms(films);
            }
            if(null != p.getStarships()){
                List<String> starships = p.getStarships().stream().map(e-> restTemplate.getForEntity(e, Starship.class).getBody()).collect(Collectors.toList())
                        .stream().map(e->e.getName()).collect(Collectors.toList());
                output.setStarships(starships);
            }
            if(null != p.getSpecies()){
                List<String> species = p.getSpecies().stream().map(e-> restTemplate.getForEntity(e, Species.class).getBody()).collect(Collectors.toList())
                        .stream().map(e->e.getName()).collect(Collectors.toList());
                output.setSpecies(species);
            }
            if(null != p.getVehicles()){
                List<String> vehicles = p.getVehicles().stream().map(e-> restTemplate.getForEntity(e, Vehicle.class).getBody()).collect(Collectors.toList())
                        .stream().map(e->e.getName()).collect(Collectors.toList());
                output.setVehicles(vehicles);
            }

        }
        return output;
    }
}

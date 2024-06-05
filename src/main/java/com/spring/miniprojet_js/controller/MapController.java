package com.spring.miniprojet_js.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller

public class MapController {

    @GetMapping
    public String getHome(){
        return "index";
    }
    @GetMapping("/map")
    public String getMap(){
        return "map";
    }
    @GetMapping("/communes")
    public String getCommunes(){
        return "communes";
    }

    @GetMapping("/population")
    public String getPopulation(){
        return "population";
    }

    @GetMapping("/hotel")
    public String getHospital(){
        return "hotel";
    }
    @GetMapping("/largesurface")
    public String getLargeSurface(){
        return "largesurface";
    }
    @GetMapping("/reclamation")
    public String getReclamation(){
        return "reclamation";
    }

}

package com.novomatic.keycloak.examples.rest.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    private static final List<String> PRODUCTS;
    static {
        PRODUCTS = new ArrayList<>();
        PRODUCTS.add("Eggs");
        PRODUCTS.add("Bacon");
        PRODUCTS.add("Onion");
        PRODUCTS.add("Salt");
    }

    public List<String> getProducts() {
        return PRODUCTS;
    }
}

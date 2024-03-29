package com.app.restaurant.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="mealorder")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int order_id;

    public Order(int tableNo, String orderDescription, String status, Customer customer, List<ShoppingCart> cartItems) {
        this.tableNo = tableNo;
        this.orderDescription = orderDescription;
        this.status = status;
        this.customer = customer;
        this.cartItems = cartItems;
    }

    private int tableNo;
    private String orderDescription;
    private String status;
    private double totalAmount;
    private int invoiceNumber;
    private String date;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "customer_id", referencedColumnName = "customer_id")
    private Customer customer;


    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, targetEntity = ShoppingCart.class)
    @JoinColumn(name = "order_id", referencedColumnName = "order_id")
    private List<ShoppingCart> cartItems;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "cook_id", referencedColumnName = "employee_id")
    private Employee cook;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "waiter_id", referencedColumnName = "employee_id")
    private Employee waiter;


    
}

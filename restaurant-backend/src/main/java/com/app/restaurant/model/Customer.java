package com.app.restaurant.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int customer_id;

    @Column(name="customer_name" , nullable = false)
    private String customerName;

    @Column(name="customer_phn" , nullable = false)
    private String customerPhone;


    public Customer(String customerName, String customerPhone) {
        this.customerName=customerName;
        this.customerPhone=customerPhone;
    }
}

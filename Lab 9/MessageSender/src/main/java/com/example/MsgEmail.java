package com.example;

public class MsgEmail implements ISender {
    private String email;

    public MsgEmail(String email) {
        this.email = email;
    }

    @Override
    public void sendMsg(String msg) {
        System.out.println("Enviando Email a " + email + ": " + msg);
    }
}
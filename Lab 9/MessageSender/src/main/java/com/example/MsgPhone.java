package com.example;

public class MsgPhone implements ISender {
    private String phone;

    public MsgPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public void sendMsg(String msg) {
        System.out.println("Enviando SMS al teléfono " + phone + ": " + msg);
    }
}

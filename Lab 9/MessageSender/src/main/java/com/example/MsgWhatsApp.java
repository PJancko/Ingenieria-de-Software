package com.example;

public class MsgWhatsApp implements ISender {
    private String phone;

    public MsgWhatsApp(String phone) {
        this.phone = phone;
    }

    @Override
    public void sendMsg(String msg) {
        System.out.println("Enviando mensaje de WhatsApp al teléfono " + phone + ": " + msg);
    }
}
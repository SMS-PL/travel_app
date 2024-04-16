package com.sms.travelapp.exception;

import com.sms.travelapp.model.Comment;

public class CommentNotFound extends RuntimeException{
    public CommentNotFound(String message){
        super(message);
    }
}

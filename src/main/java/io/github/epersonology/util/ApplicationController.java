package io.github.epersonology.util;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ApplicationController {

    @GetMapping({ "/login" })
    public String index() {
        return "redirect:/#!/signin";
    }

    @GetMapping(path = { "/webservices/users/me", "/users/me" })
    @ResponseBody
    public ResponseEntity<Principal> loginSuccess(Principal user) {
        return ResponseEntity.ok(user);
    }

}

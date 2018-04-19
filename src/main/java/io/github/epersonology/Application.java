package io.github.epersonology;

import java.util.Locale;
import java.util.TimeZone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

@SpringBootApplication
public class Application extends SpringBootServletInitializer {

    public static void main(String[] args) {
        init();
        SpringApplication.run(Application.class, args);
    }

    protected static void init() {
        // java -Duser.timezone=UTC -Duser.country=US -Duser.language=en ...
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
        Locale.setDefault(Locale.US);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        init();
        return builder.sources(Application.class);
    }
}

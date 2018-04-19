package io.github.epersonology.config;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class ApplicationProperties {

    private static Environment ENV;

    public ApplicationProperties(final Environment env) {
        ENV = env;
    }

    public static String getProperty(String key) {
        return ENV.getProperty(key);
    }

    public static String getProperty(String key, String defaultValue) {
        return ENV.getProperty(key, defaultValue);
    }
}

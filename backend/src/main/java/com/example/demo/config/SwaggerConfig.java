package com.example.demo.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI inventoryManagementOpenAPI() {

        return new OpenAPI()

                .info(new Info()

                        .title("Omnichannel StockGuard API")

                        .description("REST APIs for Intelligent Inventory Pricing Engine")

                        .version("1.0")

                        .contact(new Contact()

                                .name("ProjectK")

                                .email("teamprojectk@gmail.com"))

                        .license(new License()

                                .name("Apache 2.0")))

                .externalDocs(new ExternalDocumentation()

                        .description("Project Documentation"));
    }
}
package io.github.epersonology.util.info;

import java.util.List;

public class ApiResponse<T> {

    private List<Error> erros;
    private T data;

    public ApiResponse(List<Error> errors, T data) {
        this.erros = errors;
        this.data = data;
    }

    public List<Error> getErros() {
        return erros;
    }

    public T getData() {
        return data;
    }

}

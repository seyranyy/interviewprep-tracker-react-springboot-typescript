package com.interviewprep.backend.dto;

import com.interviewprep.backend.enums.Difficulty;
import com.interviewprep.backend.enums.QuestionCategory;
import com.interviewprep.backend.enums.QuestionStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionUpdateRequest {

    @NotBlank
    private String title;

    private String answer;

    @NotNull
    private QuestionCategory category;

    @NotNull
    private Difficulty difficulty;

    @NotNull
    private QuestionStatus status;

    private String notes;
}

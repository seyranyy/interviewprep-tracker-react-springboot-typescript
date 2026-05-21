package com.interviewprep.backend.dto;

import com.interviewprep.backend.enums.Difficulty;
import com.interviewprep.backend.enums.QuestionCategory;
import com.interviewprep.backend.enums.QuestionStatus;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionResponse {

    private Long id;
    private String title;
    private String answer;
    private QuestionCategory category;
    private Difficulty difficulty;
    private QuestionStatus status;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

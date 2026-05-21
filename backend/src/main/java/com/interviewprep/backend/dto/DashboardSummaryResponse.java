package com.interviewprep.backend.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DashboardSummaryResponse {

    private long totalQuestions;
    private long notStartedCount;
    private long learningCount;
    private long reviewCount;
    private long masteredCount;
    private long easyCount;
    private long mediumCount;
    private long hardCount;
}

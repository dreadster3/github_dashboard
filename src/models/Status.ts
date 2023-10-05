export enum EStatus {
    QUEUED = 'queued',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    WAITING = 'waiting',
}

export enum EConclusion {
    SUCCESS = 'success',
    FAILURE = 'failure',
    CANCELLED = 'cancelled',
    SKIPPED = 'skipped',
}

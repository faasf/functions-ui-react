export enum TriggerType {
    Http = 'http',
    Event = 'event',
};

export enum HttpMethod {
    Get = 'get',
    Post = 'post',
    Put = 'put',
    Patch = 'patch',
    Delete = 'delete',
};

export class Trigger {
    type!: TriggerType;
};

export class HttpTrigger implements Trigger {
    type: TriggerType = TriggerType.Http;
    method!: HttpMethod;
    url: string | undefined;
};

export class EventTrigger implements Trigger {
    type: TriggerType = TriggerType.Event;
    topic!: string;
    eventType!: string;
};

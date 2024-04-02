export const VALIDATION_CONSTANTS = {
  GAME: {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 50,
    NAME_ERROR_MESSAGE: 'Name length should be between 2 and 50 characters',

    DESCRIPTION_MIN_LENGTH: 30,
    DESCRIPTION_MAX_LENGTH: 1000,
    DESCRIPTION_ERROR_MESSAGE:
      'Description length should be between 30 and 1000 characters',

    IMAGE_URL_MESSAGE:
      'Please use a steam game image link with 616x353 resolution',
  },
  DISCUSSION: {
    TOPIC_MIN_LENGTH: 2,
    TOPIC_MAX_LENGTH: 50,
    TOPIC_ERROR_MESSAGE: 'Topic length should be between 2 and 50 characters',

    DESCRIPTION_MIN_LENGTH: 30,
    DESCRIPTION_MAX_LENGTH: 1000,
    DESCRIPTION_ERROR_MESSAGE:
      'Description length should be between 30 and 1000 characters',
  },
  GUIDE: {
    TITLE_MIN_LENGTH: 2,
    TITLE_MAX_LENGTH: 50,
    TITLE_ERROR_MESSAGE: 'Title length should be between 2 and 50 characters',

    Subtitle_MIN_LENGTH: 30,
    Subtitle_MAX_LENGTH: 1000,
    Subtitle_ERROR_MESSAGE:
      'Description length Subtitle be between 30 and 1000 characters',
  },
  REVIEW: {
    DESCRIPTION_MIN_LENGTH: 30,
    DESCRIPTION_MAX_LENGTH: 500,
    DESCRIPTION_ERROR_MESSAGE:
      'Description length should be between 30 and 500 characters',
  },
};

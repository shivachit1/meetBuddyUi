import {EventType, ParticipantOption} from './Enum';

export const eventTypeOptions = [
  {
    value: EventType.PRIVATE,
    label: 'Private',
    subLabel: 'Only invited people can see this event',
  },
  {
    value: EventType.PUBLIC,
    label: 'Public',
    subLabel: 'Everybody can see this event in their feed',
  },
];

export const participantTypeOptions = [
  {
    option: ParticipantOption.NO_LIMIT,
    label: 'No limit',
    subLabel: 'No Limit on participants numbers',
    count: undefined,
  },
  {
    option: ParticipantOption.LIMIT,
    label: 'Limited',
    subLabel: 'Only limited number of people are expected',
    count: 10,
  },
];

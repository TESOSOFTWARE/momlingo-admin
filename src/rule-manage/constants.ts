export const RULE_TABLE_HEAD = [
  {
    id: 'code',
    label: 'Mã rule',
    align: 'left',
  },
  {
    id: '',
    label: 'Mô tả',
    align: 'left',
  },
  {
    id: 'status',
    label: 'Trạng thái',
    align: 'center',
  },
  {
    id: 'option',
    label: 'Tùy chọn',
    align: 'center',
  },
];
export const CHILD_TRACKER_TABLE_HEAD = [
  {
    id: 'Week',
    label: 'Tuần',
    align: 'center',
  },
  {
    id: 'Content',
    label: 'Nội dung',
    align: 'left',
  },
  {
    id: 'option',
    label: 'Tùy chọn',
    align: 'center',
  },
];

export enum RuleConfigType {
  GAME_LUCKY_WHEEL_POINT = 'GAME_LUCKY_WHEEL_POINT',
  BIRTHDAY_NOTIFICATION_POINT = 'BIRTHDAY_NOTIFICATION_POINT',
  FIRST_TIME_ADD_POINT = 'FIRST_TIME_ADD_POINT',
  REFERRAL_APP_POINT = 'REFERRAL_APP_POINT',
  LIMITED_ADD_POINT_TURN = 'LIMITED_ADD_POINT_TURN',
  BLOCK_USER_WRONG_RULE_TURN = 'BLOCK_USER_WRONG_RULE_TURN',
  RESET_POINT_TIME = 'RESET_POINT_TIME',
  RESET_RANK_TIME = 'RESET_RANK_TIME',
}

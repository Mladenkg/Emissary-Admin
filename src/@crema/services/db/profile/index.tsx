export interface AccountData {
  member: MemberData[];
  notification: Notification;
}

export interface MemberData {
  id: number;
  title: string;
  image: string;
  name: string;
  email: string;
}

export interface Notification {
  activity: Activity[];
  application: Activity[];
}

export interface Activity {
  id: number;
  title: string;
  defaultChecked: boolean;
}

const accountData: AccountData = {
  member: [],
  notification: {
    activity: [
      {
        id: 1,
        title: "Email me when someone comments on my article",
        defaultChecked: true,
      },
      {
        id: 2,
        title: "Email me when someone answers on my form",
        defaultChecked: true,
      },
      {
        id: 3,
        title: "Email me when someone answers on my form",
        defaultChecked: false,
      },
    ],
    application: [
      {
        id: 1,
        title: "News and announcements",
        defaultChecked: false,
      },
      {
        id: 2,
        title: "Weekly product updates",
        defaultChecked: true,
      },
      {
        id: 3,
        title: "Weekly blog digest",
        defaultChecked: false,
      },
    ],
  },
};

export default accountData;

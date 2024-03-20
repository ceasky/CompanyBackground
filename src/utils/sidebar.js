export default [
  {
    title: "公告&表單",
    route: "AnnouncementForm",
    icon: "fa-layer-group",
  },
  {
    title: "使用者模組",
    icon: "fa-user",
    children: [
      {
        title: "部門管理",
        route: "DepartmentPage",
      },
      {
        title: "使用者管理",
        route: "UsersPage",
      },
    ],
  },
  {
    title: "專案模組",
    icon: "fa-folder-open",
    children: [
      {
        title: "專案管理",
        route: "ProjectManage",
      },
      {
        title: "專案紀錄",
        route: "ProjectRecord",
      },
    ],
  },
  {
    title: "工作記錄",
    icon: "fa-folder-open",
    children: [
      {
        title: "每日報工",
        route: "perDayWorkHours",
      },
      {
        title: "報工紀錄",
        route: "ProjectWorkHours",
      },
    ],
  },
  {
    title: "教育訓練",
    icon: "fa-folder-open",
    children: [
      {
        title: "課程管理",
        route: "CourseManage",
      },
      {
        title: "課程紀錄",
        route: "CourseRecord",
      },
    ],
  },
  {
    title: "人事出勤",
    icon: "fa-folder-open",
    children: [
      {
        title: "出勤紀錄",
        route: "AttendanceRecord",
      },
      {
        title: "打卡紀錄",
        route: "CheckinRecord",
      },
      {
        title: "請假紀錄",
        route: "LeaveRecord",
      },
      // {
      //   title: "出差紀錄",
      //   route: "Group2Page2",
      // },
      {
        title: "加班紀錄",
        route: "OvertimeRecord",
      },
    ],
  },
];

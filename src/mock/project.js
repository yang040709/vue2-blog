import Mock from "mockjs";



Mock.mock("/api/project", {
  code: 0,
  msg: "",
  'data|5-20': [
    {
      "id|+1": 0,
      name: "@ctitle(1,15)",
      url: "https://github.com/yang040709",
      github: "https://github.com/yang040709",
      'description|1-5': ["@cparagraph(1,2)"],
      'thumb|1': ["@image(300x250, @color, #fff, @natural)", null],
      order: 1
    }
  ]
})
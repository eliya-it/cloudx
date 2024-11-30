const menu = [
  {
    label: "Electron",
    submenu: [
      {
        label: "Item 1",
        submenu: [
          {
            label: "Item one title",
            click: () => console.log("Calling...."),
            accelerator: "Shift+Alt+G",
          },
          {
            // label: "",
            role: "toggleFullScreen",
            // enabled: false,
          },
          {
            // label: "DevTools",
            role: "toggleDevTools",
          },
        ],
      },
      { label: "Item 2" },
      { label: "Item 3" },
      { label: "Item 4" },
    ],
  },
  {
    label: "Edit",
    role: "editMenu",
  },
  {
    label: "Window",
    role: "windowMenu",
  },

  {
    label: "Actions",
    submenu: [
      {
        label: "Action 1",
      },
      {
        label: "Action 2",
      },
      {
        label: "Action 3",
      },
    ],
  },
];

module.exports = menu;

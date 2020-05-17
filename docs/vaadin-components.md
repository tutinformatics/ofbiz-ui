# [Vaadin](https://vaadin.com/components/) Components

## Vaadin Grid

Basic usage:
```html
<vaadin-grid theme="compact row-stripes" column-reordering-allowed height-by-rows>
        <vaadin-grid-column path="projectId" header="Project ID"></vaadin-grid-column>
        <vaadin-grid-column path="projectName" header="Project Name"></vaadin-grid-column>
        <vaadin-grid-column path="currentStatusId" header="Current Status"></vaadin-grid-column>
</vaadin-grid>
```

Initialize grid in `attached` lifecycle hook(when component will be attached to the DOM):
```javascript
attached() {
    const grid = document.querySelector("vaadin-grid");
    this.initGridColumns();
    this.projectService
      .getProjectList()
      .then((response) => (grid.items = response));
  }
```

Use renderer functions if you want to define custom content inside colums:
```javascript
initGridColumns() {
    const columns = document.querySelectorAll("vaadin-grid-column");
    columns[0].renderer = (root, column, rowData) => {
      const projectId = rowData.item.projectId;
      root.innerHTML = `<a href="javascript:void(0);">${projectId}<a/>`;
      root.addEventListener("click", () => this.handleSelectProject(projectId));
    };
```

More infomation: [Docs](https://vaadin.com/components/vaadin-grid/html-examples)

## Vaadin Date Picker

Basic usage:
```html
<vaadin-date-picker label="Label"></vaadin-date-picker>
<vaadin-date-picker placeholder="Placeholder"></vaadin-date-picker>
<vaadin-date-picker value="1990-01-28"></vaadin-date-picker>
```

Value binding:
```javascript
attached() {
    const datePicker = document.querySelector('vaadin-date-picker');
    datePicker.addEventListener('change', (event) =>
      (this.timesheet.fromDate = event.target.value)
    );
  }
```

More information: [Docs](https://vaadin.com/components/vaadin-date-picker/html-examples)


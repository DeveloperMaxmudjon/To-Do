(function () {
  const categHero = document.getElementById("categHero");
  const editorModal = document.getElementById("editorModal");
  const addCategoryBtn = document.getElementById("addCategoryBtn");
  const categBack = document.getElementById("categBack");
  const editorBack = document.getElementById("editorBack");
  const editorTitle = document.getElementById("editorTitle");
  const editorLabel = document.getElementById("editorLabel");
  const editorInput = document.getElementById("editorInput");
  const editorPrimary = document.getElementById("editorPrimary");
  const editorCancel = document.getElementById("editorCancel");
  const addStatusBtn = document.getElementById("addStatusBtn");
  const addPriorityBtn = document.getElementById("addPriorityBtn");
  const statusBody = document.getElementById("statusBody");
  const priorityBody = document.getElementById("priorityBody");
  if (!categHero || !editorModal) return;


  function showHero() {
    categHero.style.display = "block";
    editorModal.style.display = "none";
  }
  function showEditor() {
    categHero.style.display = "none";
    editorModal.style.display = "block";
  }
  function stopLink(e) {
    if (e) e.preventDefault();
  }
  function rebuildSN(tbody) {
    const rows = tbody ? tbody.querySelectorAll("tr") : [];
    rows.forEach((tr, i) => {
      const td = tr.querySelector("td");
      if (td) td.textContent = String(i + 1);
    });
  }
  function makeRow(name, options) {
    const tr = document.createElement("tr");
    const tdSN = document.createElement("td");
    tdSN.textContent = "0";
    const tdName = document.createElement("td");
    tdName.textContent = name;
    const tdAction = document.createElement("td");
    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.textContent = "Edit";
    editBtn.dataset.action = "edit";
    if (options && options.rowType) editBtn.dataset.rowType = options.rowType;
    if (options && options.categoryId) editBtn.dataset.categoryId = String(options.categoryId);
    tdAction.appendChild(editBtn);
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.dataset.action = "delete";
    deleteBtn.style.marginLeft = "5px";
    tdAction.appendChild(deleteBtn);
    tr.appendChild(tdSN);
    tr.appendChild(tdName);
    tr.appendChild(tdAction);
    return tr;
  }
  let activeMode = null;
  let activePayload = null;
  function openModal(titleText, labelText, primaryText, defaultValue, mode, payload) {
    if (editorTitle) editorTitle.textContent = titleText;
    if (editorLabel) editorLabel.textContent = labelText;
    if (editorPrimary) editorPrimary.textContent = primaryText;
    if (editorInput) editorInput.value = defaultValue || "";
    activeMode = mode;
    activePayload = payload || null;
    showEditor();
    if (editorInput) editorInput.focus();
  }
  function closeModal() {
    activeMode = null;
    activePayload = null;
    if (editorInput) editorInput.value = "";
    showHero();
  }
  function isNonEmpty(v) {
    return String(v || "").trim().length > 0;
  }
  function createCategorySection(categoryTitle) {
    const section = document.createElement("section");
    const categoryId = String(Date.now() + Math.floor(Math.random() * 1000));
    section.setAttribute("aria-label", categoryTitle);
    section.dataset.categoryId = categoryId;
    const header = document.createElement("header");
    const left = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.textContent = categoryTitle;
    const underline = document.createElement("span");
    left.appendChild(h3);
    left.appendChild(underline);
    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.textContent = "+ Add " + categoryTitle;
    addBtn.dataset.action = "add-category-item";
    addBtn.dataset.categoryId = categoryId;
    header.appendChild(left);
    header.appendChild(addBtn);
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th>SN</th>
        <th>${categoryTitle}</th>
        <th>Action</th>
      </tr>
    `;
    const tbody = document.createElement("tbody");
    tbody.dataset.categoryId = categoryId;
    table.appendChild(thead);
    table.appendChild(tbody);
    section.appendChild(header);
    section.appendChild(table);
    return { section, tbody, categoryId };
  }
  function addRowToTbody(tbody, value, rowType, extra) {
    const tr = makeRow(value, Object.assign({ rowType }, extra || {}));
    tbody.appendChild(tr);
    rebuildSN(tbody);
  }
  function handleEditClick(btn) {
    const row = btn.closest("tr");
    if (!row) return;
    const nameCell = row.children && row.children[1] ? row.children[1] : null;
    const current = nameCell ? nameCell.textContent : "";
    const rowType = btn.dataset.rowType || "";
    if (rowType === "status") {
      openModal("Edit Task Status", "Task Status Name", "Update", current, "edit-row", { row, nameCell });
    } else if (rowType === "priority") {
      openModal("Edit Task Priority", "Task Priority Title", "Update", current, "edit-row", { row, nameCell });
    } else if (rowType === "category") {
      const title = btn.dataset.categoryTitle || "Item";
      openModal("Edit " + title, title + " Name", "Update", current, "edit-row", { row, nameCell });
    }
  }
  document.addEventListener("click", function (e) {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const editBtn = target.closest('button[data-action="edit"]');
    if (editBtn) {
      handleEditClick(editBtn);
      return;
    }
    const addCategoryItemBtn = target.closest('button[data-action="add-category-item"]');
    if (addCategoryItemBtn) {
      const categoryId = addCategoryItemBtn.dataset.categoryId;
      const categorySection = categHero.querySelector(`section[data-category-id="${categoryId}"]`);
      const h3 = categorySection ? categorySection.querySelector("header h3") : null;
      const title = h3 ? h3.textContent : "Category";
      const tbody = categorySection ? categorySection.querySelector("tbody") : null;
      if (tbody) openModal("Add " + title, title + " Name", "Create", "", "add-category-item", { tbody, title });
    }
  });
  if (categBack) categBack.onclick = (e) => { stopLink(e); showHero(); };
  if (editorBack) editorBack.onclick = (e) => { stopLink(e); showHero(); };
  if (editorCancel) editorCancel.onclick = () => closeModal();
  if (addCategoryBtn) addCategoryBtn.onclick = () => openModal("Create Categories", "Category Name", "Create", "", "add-category", null);
  if (addStatusBtn) addStatusBtn.onclick = () => openModal("Add Task Status", "Task Status Name", "Create", "", "add-status", null);
  if (addPriorityBtn) addPriorityBtn.onclick = () => openModal("Add Task Priority", "Task Priority Title", "Create", "", "add-priority", null);
  if (statusBody) {
    statusBody.querySelectorAll('button[data-action="edit"]').forEach(b => b.dataset.rowType = "status");
    rebuildSN(statusBody);
  }
  if (priorityBody) {
    priorityBody.querySelectorAll('button[data-action="edit"]').forEach(b => b.dataset.rowType = "priority");
    rebuildSN(priorityBody);
  }
  function dispatchUpdate() {
    document.dispatchEvent(new CustomEvent("taskCategoriesUpdated"));
  }
  document.addEventListener("click", function (e) {
    if (e.target && e.target.dataset.action === "delete") {
      const row = e.target.closest("tr");
      if (row) {
        const tbody = row.parentElement;
        row.remove();
        rebuildSN(tbody);
        dispatchUpdate();
      }
    }
  });
  if (editorPrimary) {
    editorPrimary.addEventListener("click", function () {
      const value = editorInput ? editorInput.value.trim() : "";
      if (!isNonEmpty(value)) return;
      if (activeMode === "add-category") {
        const created = createCategorySection(value);
        const hr = categHero.querySelector("hr");
        if (hr) categHero.insertBefore(created.section, hr);
        else categHero.appendChild(created.section);
        closeModal();
        dispatchUpdate();
      } else if (activeMode === "add-status") {
        if (statusBody) {
          addRowToTbody(statusBody, value, "status");
          closeModal();
          dispatchUpdate();
        }
      } else if (activeMode === "add-priority") {
        if (priorityBody) {
          addRowToTbody(priorityBody, value, "priority");
          closeModal();
          dispatchUpdate();
        }
      } else if (activeMode === "add-category-item") {
        const tbody = activePayload && activePayload.tbody ? activePayload.tbody : null;
        if (tbody) {
          addRowToTbody(tbody, value, "category", { categoryId: tbody.dataset.categoryId || "" });
          closeModal();
          dispatchUpdate();
        }
      } else if (activeMode === "edit-row") {
        const nameCell = activePayload && activePayload.nameCell ? activePayload.nameCell : null;
        if (nameCell) nameCell.textContent = value;
        closeModal();
        dispatchUpdate();
      }
    });
  }
  showHero();
})();

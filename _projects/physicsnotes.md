---
layout: page
title: STEM Notes
description: Physics Olympiad materials, study group handouts, and many more.
img: assets/img/physicsnotecoverimg.jpg
importance: 1
category: active
related_publications: false
---

This is a collection of my notes, which include study group materials, Q&A documents, unpublished research, and more. Some of them aren't serious at all - I just like to write stuff for fun sometimes!

Items marked with `(中文)` are in Mandarin Chinese, while the remainder are in English.

<script>
  // Fetch and display notes from the JSON file
  fetch('/assets/json/physicsnotes.json')
    .then(response => response.json())
    .then(data => {
      // Define group titles
      const groupTitles = {
        10: "Physics Olympiad",
        20: "Research / Experiments",
        25: "Young Physicists' Tournament",
        30: "Study Group / YouTube Materials",
        40: "Miscellaneous"
      };

      // Group notes by "group" and sort
      const groupedNotes = {};
      for (const key in data) {
        const note = data[key];
        if (!groupedNotes[note.group]) groupedNotes[note.group] = [];
        groupedNotes[note.group].push(note);
      }

      // Sort groups by group number and then sort notes by date
      const sortedGroups = Object.keys(groupedNotes).sort((a, b) => parseInt(a) - parseInt(b));

      // Generate table for each group
      let content = '';
      sortedGroups.forEach(group => {
        // Sort notes within the group by date
        groupedNotes[group].sort((a, b) => new Date(b.date) - new Date(a.date)); // Descending order

        content += `<h2>${groupTitles[group]}</h2>`;
        content += `
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
        `;
        groupedNotes[group].forEach(note => {
          content += `
            <tr>
              <td><a href="${note.href}" target="_blank">${note.title}</a></td>
              <td>${note.description}</td>
              <td>${note.date}</td>
            </tr>
          `;
        });
        content += '</tbody></table>';
      });

      // Insert content into the page
      document.querySelector('#notes-content').innerHTML = content;
    })
    .catch(error => console.error('Error fetching notes:', error));
</script>


<style>
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  th, td {
    padding: 15px;
    text-align: left;
  }
  tr {
    height: 60px; /* Increased row height */
  }
  h2 {
    margin-top: 30px;
  }
</style>

<div id="notes-content"></div>

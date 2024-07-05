const filesDictionary = {
  "DriftingGasSystem": {
    title: 'Drifting Gas System',
    description: 'Translated Olympiad problem with my own solution, later posted as a discussion problem in Physoly discord server.',
    href: 'Drifting_Gas_System.pdf',
    size: 109,
    date: '2023/10',
    group: 10
  },
  "TYPTFourierAnalysis": {
    title: 'TYPT 講義：傅立葉分析<br>TYPT Handout: Fourier Transform',
    description: 'Handout for the TYPT team on Fourier Transforms.',
    href: '物辯講義_傅立葉分析.pdf',
    size: 564,
    date: '2023/09',
    group: 30
  },
  "FocusOfParabola": {
    title: 'Focus of a Parabola',
    description: 'An understanding of the focus of a parabola.',
    href: 'Focus_of_a_Parabola.pdf',
    size: 214,
    date: '2023/03',
    group: 10
  },
  "AverageOfSineSquared": {
    title: 'Average of Sine Squared',
    description: 'A calculus proof of why the average of sine squared is one half.',
    href: 'Average_of_sine_squared.pdf',
    size: 85,
    date: '2022/06',
    group: 10
  },
  "EntropyChangeThermalEqulibrium": {
    title: 'Entropy Change of Thermal Equlibrium',
    description: 'A reply to a question on Discord.',
    href: 'Entropy_Change_of_Thermal_Equlibrium.pdf',
    size: 108,
    date: '2023/06',
    group: 10
  },
  "FundamentalsODE": {
    title: 'Fundamentals of solving ODE',
    description: 'Some fundamental ordinary differential equation techniques.',
    href: 'Fundamentals_of_ODE.pdf',
    size: 214,
    date: '2022/07',
    group: 10
  },
  "InternalKineticEnergyProblem": {
    title: 'Internal Kinetic Energy Problem from the 2023 Taiwan Physics Olympiad 1st Round Qualifiers',
    description: 'A translated Olympiad selection problem solved with internal kinetic energy.',
    href: 'Internal_Kinetic_Energy_2023_TPhO_1st_Round.pdf',
    size: 331,
    date: '2023/07',
    group: 10
  },
  "MisconceptionPressureTermBernoulli": {
    title: 'Misconception Regarding the Pressure Term in Bernoulli\'s Equation',
    description: 'Resolving a misconception concerning Bernoulli\'s equation proposed by a classmate.',
    href: 'Misconception__Bernoulli_Equation_Pressure.pdf',
    size: 204,
    date: '2023/07',
    group: 10
  },
  "MisconceptionDirectionSurfaceTension": {
    title: 'Misconception Regarding Direction of Macroscopic Surface Tension',
    description: 'Resolving a misconception concerning direction of surface tension.',
    href: 'Misconception__Direction_of_surface_tension.pdf',
    size: 184,
    date: '2023/07',
    group: 10
  },
  "IntuitiveUnderstandingMechanicalPendulum": {
    title: 'Intuitive Understanding of the Behavior of the Mechanical Pendulum Beyond the Small-Angle Approximation',
    description: 'A trivial paper regarding pendulum motion that I wrote just for fun.',
    href: 'Numerical_Pendulum.pdf',
    size: 1547,
    date: '2023/11',
    group: 20
  },
  "PhysicsCupProblem1": {
    title: 'Physics Cup Problem 1',
    description: 'Submission to 2023 Physics Cup Problem 1. This solution is judged incorrect.',
    href: 'Physics_Cup_Problem_1.pdf',
    size: 923,
    date: '2023/10',
    group: 40
  },
  "SuborbitalProjectileMotion": {
    title: 'Suborbital Projectile Motion',
    description: 'Analysis of the maximum height achievable with a projectile.',
    href: 'Suborbital_Projectile_Problem.pdf',
    size: 107,
    date: '2023/05',
    group: 10
  },
  "FunProblemsRotations": {
    title: '有趣的轉動題目<br>Fun Problems in Rotations',
    description: 'Collection of problems for an RoAC weekend study group.',
    href: '有趣的轉動題目.pdf',
    size: 544,
    date: '2023/08',
    group: 30
  },
  "PhysicsFilesWritingSummary": {
    title: '物理文檔撰寫成果<br>Physics Files Writing Summary',
    description: 'Brief intro and summary of my motivations on writing physics documents.',
    href: '物理文檔集錦.pdf',
    size: 258,
    date: '2023/08',
    group: 10
  },
  "MathPreliminariesHighSchoolPhysicsCompetitions": {
    title: 'Math Preliminaries for High School Physics Competitions',
    description: 'Math equation summary for high school physics competitions.',
    href: '物辯講義_Math_Preliminaries.pdf',
    size: 100,
    date: '2023/09',
    group: 30
  },
  "TYPTOscillations": {
    title: 'TYPT 講義：震盪<br>TYPT Handout: Oscillations',
    description: 'Handout for the TYPT team on SHM, damped oscillations and coupled oscillations.',
    href: '物辯講義_震盪.pdf',
    size: 639,
    date: '2023/10',
    group: 30
  },
  "Matrices": {
    title: '矩陣<br>Matrices',
    description: 'Introduction on matrices in high school level.',
    href: '矩陣.pdf',
    size: 339,
    date: '2022/06',
    group: 10
  },
  "DiffractionReport": {
    title: '干涉與繞射 實驗報告<br>Lab Report: Interference and Diffraction',
    description: 'School experiment report on physical optics.',
    href: 'diffractionExperimentReport.pdf',
    size: 762,
    date: '2023/11',
    group: 20
  // },
  // "ElsaDuet": {
  //   title: 'Elsa Duet',
  //   description: 'A piano-flute duet I remixed. See it on <a href="https://musescore.com/user/41685798/scores/13648249/piano-tutorial">Musescore</a>',
  //   href: 'elsaduet.pdf',
  //   size: 104,
  //   date: '2023/12',
  //   group: 40
  },"PhySG20240105": {
    title: 'PhySG 2024/01/05',
    description: 'Problem set for 2024/01/05 Physics Study Group on the Vis-Viva equation and the Tsiolkovsky rocket equation.',
    href: 'physg20240105.pdf',
    size: 793,
    date: '2024/01',
    group: 30
  },"PhySG20231201": {
    title: 'PhySG 2023/12/01',
    description: 'Problem set for 2023/12/01 Physics Study Group on polar coordinates.',
    href: 'physg20231201v3.pdf',
    size: 663,
    date: '2023/12',
    group: 30
  },"RRLyraeReportTISF": {
    title: 'TISF 2024 Research Paper',
    description: 'My research report regarding RR Lyrae stars which I participated in the 2024 Taiwan International Science Fair with. This project got third prize and I received a chance to participate in the MOSTRATEC fair in Brazil!',
    href: '星團科展最終版二修.pdf',
    size: 4707,
    date: '2023/11',
    group: 20
  },"RRLyraePosterTISF": {
    title: 'TISF 2024 Poster',
    description: 'My poster at the 2024 TISF.',
    href: 'TISFposter.pdf',
    size: 2540,
    date: '2024/02',
    group: 20
  },"RRLyraeDiaryTISF": {
    title: 'TISF 2024 Research Diary',
    description: 'Research diary for my TISF 2024 project.',
    href: 'TISF日誌.pdf',
    size: 4423,
    date: '2024/02',
    group: 20
  },"StrawReport": {
    title: '2024 City Science Fair Report',
    description: 'My report at the 2024 Chiayi Science Fair regarding an interesting 2024 IYPT problem: Pumping Straw.',
    href: '吸管科展.pdf',
    size: 1891,
    date: '2024/04',
    group: 20
  },"StrawPoster": {
    title: '2024 City Science Fair Poster',
    description: 'My poster at the 2024 Chiayi Science Fair.',
    href: '吸管科展海報.pdf',
    size: 2439,
    date: '2024/04',
    group: 20
  },
  "PhysicsCupProblem2": {
    title: 'Physics Cup Problem 2',
    description: 'Submission to 2023 Physics Cup Problem 2. This is my second solution and is judged correct. My first solution, which is rejected, is appended at the end of this file.',
    href: '2023pc_2_2024_01_07_cyh.pdf',
    size: 1499,
    date: '2024/01',
    group: 40
  },"vectorAnalysisTeach": {
    title: '基礎向量分析 Basic Vector Analysis',
    description: 'Handout on preliminary vector analysis in preparation for electromagnetics (2024/02/20) Physics Study Group).',
    href: 'TISF日誌.pdf',
    size: 564,
    date: '2024/02',
    group: 30
  },"PhySG20231115": {
    title: 'PhySG 2023/11/15',
    description: 'Problem set for 2023/11/15 Physics Study Group on 2D motion and polar coordinates.',
    href: '20231115physicssg.pdf',
    size: 857,
    date: '2023/11',
    group: 30
  },"PhySG20240220HW": {
    title: '基礎向量分析作業 Basic Vector Analysis HW',
    description: 'Homework (with solution) for 2024/02/20 Physics Study Group on vector analysis.',
    href: 'vectorAnalysisHWwithsol.pdf',
    size: 250,
    date: '2024/02',
    group: 30
  },"AboutMe": {
    title: 'About Me',
    description: 'A neat PDF about myself.',
    href: 'About Cheng-You.pdf',
    size: 792, 
    date: '2024/02',
    group: 40
  },"kepler4proof": {
    title: '克卜勒定律的四種證明',
    description: 'Four proofs of Kepler\'s first law.',
    href: 'Kepler1st.pdf',
    size: 792, 
    date: '2024/06',
    group: 10
  }
};

// Sort files based on 'yyyy/mm' dates
let sortedFilesArray = Object.entries(filesDictionary)
  .sort(([keyA, fileA], [keyB, fileB]) => {
    let dateA = new Date(fileA.date);
    let dateB = new Date(fileB.date);

    // Sort in descending order (latest ones first)
    return dateB - dateA;
  });

// Convert the sorted array back to a dictionary
let sortedFilesDictionary = Object.fromEntries(sortedFilesArray);

// // Get the table body
// let tableBody = document.querySelector("#resourceTable tbody");

// // Iterate over the filesDictionary and populate the table
// for (let fileKey in sortedFilesDictionary) {
//     let file = sortedFilesDictionary[fileKey];

//     // Create a new row
//     let row = tableBody.insertRow();

//     // Create cells and populate with data
//     let titleCell = row.insertCell(0);
//     titleCell.innerHTML = `<a href="resources/${file.href}">${file.title}</a>`;

//     let descriptionCell = row.insertCell(1);
//     descriptionCell.textContent = file.description;

//     let dateCell = row.insertCell(2);
//     dateCell.textContent = file.date;

//     let sizeCell = row.insertCell(3);
//     sizeCell.textContent = `${file.size} kb`;
// }
  
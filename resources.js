const filesDictionary = {
  "DriftingGasSystem": {
    title: 'Drifting Gas System',
    description: 'Translated Olympiad problem with my own solution, later posted as a discussion problem in Physoly discord server.',
    href: 'Drifting_Gas_System.pdf',
    size: 109,
    date: '2023/10'
  },
  "TYPTFourierAnalysis": {
    title: 'TYPT 講義：傅立葉分析<br>TYPT Handout: Fourier Transform',
    description: 'Handout for the TYPT team on Fourier Transforms.',
    href: '物辯講義_傅立葉分析.pdf',
    size: 564,
    date: '2023/09'
  },
  "FocusOfParabola": {
    title: 'Focus of a Parabola',
    description: 'An understanding of the focus of a parabola.',
    href: 'Focus_of_a_Parabola.pdf',
    size: 214,
    date: '2023/03'
  },
  "AverageOfSineSquared": {
    title: 'Average of Sine Squared',
    description: 'A calculus proof of why the average of sine squared is one half.',
    href: 'Average_of_sine_squared.pdf',
    size: 85,
    date: '2022/06'
  },
  "EntropyChangeThermalEqulibrium": {
    title: 'Entropy Change of Thermal Equlibrium',
    description: 'A reply to a question on Discord.',
    href: 'Entropy_Change_of_Thermal_Equlibrium.pdf',
    size: 108,
    date: '2023/06'
  },
  "FundamentalsODE": {
    title: 'Fundamentals of solving ODE',
    description: 'Some fundamental ordinary differential equation techniques.',
    href: 'Fundamentals_of_ODE.pdf',
    size: 214,
    date: '2022/07'
  },
  "InternalKineticEnergyProblem": {
    title: 'Internal Kinetic Energy Problem from the 2023 Taiwan Physics Olympiad 1st Round Qualifiers',
    description: 'A translated Olympiad selection problem solved with internal kinetic energy.',
    href: 'Internal_Kinetic_Energy_2023_TPhO_1st_Round.pdf',
    size: 331,
    date: '2023/07'
  },
  "MisconceptionPressureTermBernoulli": {
    title: 'Misconception Regarding the Pressure Term in Bernoulli\'s Equation',
    description: 'Resolving a misconception concerning Bernoulli\'s equation proposed by a classmate.',
    href: 'Misconception__Bernoulli_Equation_Pressure.pdf',
    size: 204,
    date: '2023/07'
  },
  "MisconceptionDirectionSurfaceTension": {
    title: 'Misconception Regarding Direction of Macroscopic Surface Tension',
    description: 'Resolving a misconception concerning direction of surface tension.',
    href: 'Misconception__Direction_of_surface_tension.pdf',
    size: 184,
    date: '2023/07'
  },
  "IntuitiveUnderstandingMechanicalPendulum": {
    title: 'Intuitive Understanding of the Behavior of the Mechanical Pendulum Beyond the Small-Angle Approximation',
    description: 'A trivial paper regarding pendulum motion that I wrote just for fun.',
    href: 'Numerical_Pendulum.pdf',
    size: 1547,
    date: '2023/11'
  },
  "PhysicsCupProblem1": {
    title: 'Physics Cup Problem 1',
    description: 'Submission to 2023 Physics Cup Problem 1. This solution is judged incorrect.',
    href: 'Physics_Cup_Problem_1.pdf',
    size: 923,
    date: '2023/10'
  },
  "SuborbitalProjectileMotion": {
    title: 'Suborbital Projectile Motion',
    description: 'Analysis of the maximum height achievable with a projectile.',
    href: 'Suborbital_Projectile_Problem.pdf',
    size: 107,
    date: '2023/05'
  },
  "FunProblemsRotations": {
    title: '有趣的轉動題目<br>Fun Problems in Rotations',
    description: 'Collection of problems for an RoAC weekend study group.',
    href: '有趣的轉動題目.pdf',
    size: 544,
    date: '2023/08'
  },
  "PhysicsFilesWritingSummary": {
    title: '物理文檔撰寫成果<br>Physics Files Writing Summary',
    description: 'Brief intro and summary of my motivations on writing physics documents.',
    href: '物理文檔集錦.pdf',
    size: 258,
    date: '2023/08'
  },
  "MathPreliminariesHighSchoolPhysicsCompetitions": {
    title: 'Math Preliminaries for High School Physics Competitions',
    description: 'Math equation summary for high school physics competitions.',
    href: '物辯講義_Math_Preliminaries.pdf',
    size: 100,
    date: '2023/09'
  },
  "TYPTOscillations": {
    title: 'TYPT 講義：震盪<br>TYPT Handout: Oscillations',
    description: 'Handout for the TYPT team on SHM, damped oscillations and coupled oscillations.',
    href: '物辯講義_震盪.pdf',
    size: 639,
    date: '2023/10'
  },
  "Matrices": {
    title: '矩陣<br>Matrices',
    description: 'Introduction on matrices in high school level.',
    href: '矩陣.pdf',
    size: 339,
    date: '2022/06'
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

// Get the table body
let tableBody = document.querySelector("#resourceTable tbody");

// Iterate over the filesDictionary and populate the table
for (let fileKey in sortedFilesDictionary) {
    let file = sortedFilesDictionary[fileKey];

    // Create a new row
    let row = tableBody.insertRow();

    // Create cells and populate with data
    let titleCell = row.insertCell(0);
    titleCell.innerHTML = `<a href="resources/${file.href}">${file.title}</a>`;

    let descriptionCell = row.insertCell(1);
    descriptionCell.textContent = file.description;

    let dateCell = row.insertCell(2);
    dateCell.textContent = file.date;

    let sizeCell = row.insertCell(3);
    sizeCell.textContent = `${file.size} kb`;
}
  
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import ListEmployee from "../Pages/ListEmployee/ListEmployee";
import Table from "../Components/Table/Table";
import { Provider } from "react-redux";
import { mockEmployees, headers } from "../MockTest/mockTest";
import store from "../Redux/store";

const renderWithProvider = (component) => {
  render(<Provider store={store}>{component}</Provider>);
};

describe("En tant qu'employer je veux accéder a la page ListEmployee", () => {
  test('ÉTANT DONNÉ que la page ListEmployee est rendue, QUAND le titre de la page est vérifié, ALORS le titre devrait être "List Employee"', () => {
    renderWithProvider(<ListEmployee />);
    expect(screen.getByText(/List Employee/i)).toBeInTheDocument();
  });

  test("ÉTANT DONNÉ que la page ListEmployee est rendue, QUAND le tableau est vérifié, ALORS tous les champs du tableau devraient être présents", () => {
    renderWithProvider(<ListEmployee />);

    expect(screen.getByText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Street/i)).toBeInTheDocument();
    expect(screen.getByText(/City/i)).toBeInTheDocument();
    expect(screen.getByText(/State/i)).toBeInTheDocument();
    expect(screen.getByText(/Zip Code/i)).toBeInTheDocument();
    expect(screen.getByText(/Department/i)).toBeInTheDocument();
  });
});

describe("En tant qu'employer je veux effectuer une recherche, Afin de trouver un employé plus rapidement dans le tableau", () => {
  test("Étant donné que le tableau est rendu, Quand on effectue une recherche seul les employés qui corresponde a la saisie son visible", () => {
    render(<Table data={mockEmployees} headers={headers} />);

    // Initialement, toutes les données doivent être affichées
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Johny")).toBeInTheDocument();

    // Tapez une requête de recherche dans l'entrée de recherche pour filtrer les données
    const searchInput = screen.getByLabelText("Search");
    fireEvent.change(searchInput, { target: { value: "Ilane" } });

    // Seul "Ilane" doit être affiché
    expect(screen.getByText("Ilane")).toBeInTheDocument();

    // "John" et "Johny" ne doivent pas être affichés
    expect(screen.queryByText("John")).not.toBeInTheDocument();
    expect(screen.queryByText("Johny")).not.toBeInTheDocument();

    // Effacez l'entrée de recherche pour afficher à nouveau toutes les données
    fireEvent.change(searchInput, { target: { value: "" } });

    // "John", "Johny", "Ilane" doivent être affichés à nouveau
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Johny")).toBeInTheDocument();
    expect(screen.getByText("Ilane")).toBeInTheDocument();
  });
});

describe("En tant qu'employer je veux effectuer un tri par le nombre d'éléments a afficher, Afin de contrôler le nombre d'éléments a afficher", () => {
  test("Étant donné que le tableau est rendu, Quand on effectue un tri par le nombre d'éléments sélectionner a afficher, ALORS le nombre d'éléments a afficher doit être égale au nombre d'éléments a afficher", () => {
    render(<Table data={mockEmployees} headers={headers} />);
    // Sélectionnez l'élément de select par son attribut
    const selectElement = screen.getByTestId("numberShow");
    // Vérifiez que l'élément select est présent dans le DOM
    expect(selectElement).toBeInTheDocument();
    // Sélectionnez une option dans le select en utilisant fireEvent
    fireEvent.change(selectElement, { target: { value: "10" } });
    // Vérifiez que la valeur sélectionnée a été mise à jour
    expect(selectElement.value).toBe("10");

    //On affiche les 10 premiers éléments du tableau mockEmployees uniquement.
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Ilane")).toBeInTheDocument();
    expect(screen.getByText("Johny")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Emma")).toBeInTheDocument();
    expect(screen.getByText("James")).toBeInTheDocument();
    expect(screen.getByText("Olivia")).toBeInTheDocument();
    expect(screen.getByText("Michael")).toBeInTheDocument();
    expect(screen.getByText("Sophia")).toBeInTheDocument();

    // On vérifie que le 11ᵉ élément n'est pas affichée
    expect(screen.queryByText("David")).not.toBeInTheDocument();
  });
});

describe("En tant qu'employer je veux effectuer un tri par ordre alphabétique, Afin de contrôler l'ordre d'affichage des éléments", () => {
  test("Étant donné que le tableau est bien rendu, Quand je clique sur le trie ce la doit trier par nom croissant", async () => {
    render(<Table data={mockEmployees} headers={headers} />);

    fireEvent.click(screen.getByText("First Name"));
    // Récupérer les valeurs des éléments triés (First Name)
    const sortedData = [...mockEmployees].sort((a, b) =>
      a.firstName.localeCompare(b.firstName),
    );
    // Récupérer les valeurs triées
    const sortedDataValues = sortedData
      .map((element) => element.firstName)
      .slice(0, 10);
    // Vérifier que toutes les valeurs triées sont présentes
    const sortedValuesVerif = screen.getAllByTestId("arrayData");
    const compareValueSorted = [];
    sortedValuesVerif.forEach((element) => {
      compareValueSorted.push(element.textContent);
    });
    expect(sortedDataValues).toEqual(compareValueSorted);
  });

  test("Étant donné que le tableau est bien rendu, Quand je clique sur le trie ce la doit trier par nom décroissant", () => {
    render(<Table data={mockEmployees} headers={headers} />);
    fireEvent.click(screen.getByText("First Name"));
    fireEvent.click(screen.getByText("First Name"));
    const sortedData = [...mockEmployees].sort((a, b) =>
      b.firstName.localeCompare(a.firstName),
    );
    // Récupérer les valeurs triées
    const sortedDataValues = sortedData
      .map((element) => element.firstName)
      .slice(0, 10);

    const sortedValuesVerif = screen.getAllByTestId("arrayData");
    const compareValueSorted = [];
    sortedValuesVerif.forEach((element) => {
      compareValueSorted.push(element.textContent);
    });
    // Vérifier que toutes les valeurs triées sont présentes
    expect(sortedDataValues).toEqual(compareValueSorted);
  });
});
//pagination next et previous
describe("En tant qu'employer je veux effectuer une pagination, Afin de pouvoir naviguer entre les différentes pages", () => {
  test("Étant donné que le tableau est rendu, lorsque je clic sur les boutons next ou prev cela devrais afficher les autres elements du tableau ou de ré afficher les elements", () => {
    // On rend le composant Table avec les données mockEmployees et les headers
    render(<Table data={mockEmployees} headers={headers} />);
    // On vérifie si les 10 premiers éléments du tableau mockEmployees sont affichées
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Ilane")).toBeInTheDocument();
    expect(screen.getByText("Johny")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Emma")).toBeInTheDocument();
    expect(screen.getByText("James")).toBeInTheDocument();
    expect(screen.getByText("Olivia")).toBeInTheDocument();
    expect(screen.getByText("Michael")).toBeInTheDocument();
    expect(screen.getByText("Sophia")).toBeInTheDocument();
    // On simule le click sur le bouton next pour afficher les 10 éléments suivant
    fireEvent.click(screen.getByText("Next"));
    // On vérifie que le 11 au 15 élément est affichée
    expect(screen.getByText("David")).toBeInTheDocument();
    expect(screen.getByText("Emily")).toBeInTheDocument();
    expect(screen.getByText("William")).toBeInTheDocument();
    expect(screen.getByText("Ella")).toBeInTheDocument();
    //on vérifie que le 1 premier élément ne sois plus affichée
    expect(screen.queryByText("John")).not.toBeInTheDocument();

    // On simule le click sur le bouton previous pour afficher les 10 éléments précédent
    fireEvent.click(screen.getByText("Previous"));
    // On vérifie que le 1 au 10 élément est affichée
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Ilane")).toBeInTheDocument();
    expect(screen.getByText("Johny")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Emma")).toBeInTheDocument();
    expect(screen.getByText("James")).toBeInTheDocument();
    expect(screen.getByText("Olivia")).toBeInTheDocument();
    expect(screen.getByText("Michael")).toBeInTheDocument();
    expect(screen.getByText("Sophia")).toBeInTheDocument();
    //on vérifie que le 11 premier élément ne sois plus affichée
    expect(screen.queryByText("David")).not.toBeInTheDocument();
  });
});

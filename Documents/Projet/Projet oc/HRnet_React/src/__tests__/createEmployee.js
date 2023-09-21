import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import CreateEmployee from "../Pages/createEmployee/createEmployee";
import NavBar from "../Components/NavBar/NavBar";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../Redux/store";

const renderWithProvider = (component) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe("En tant qu'employer je veux accéder a la page createEmployee", () => {
  test('ÉTANT DONNÉ que la page createEmployee est rendue, QUAND le titre de la page est vérifié, ALORS le titre devrait être "hrnet"', () => {
    renderWithProvider(<CreateEmployee />);
    expect(screen.getByText(/HRnet/i)).toBeInTheDocument();
  });

  test("ÉTANT DONNÉ que la page createEmployee est rendue, QUAND le formulaire est vérifié, ALORS tous les champs du formulaire devraient être présents", () => {
    renderWithProvider(<CreateEmployee />);
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Street/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/State/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Zip Code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Department/i)).toBeInTheDocument();
    expect(screen.getByText(/Save/i)).toBeInTheDocument();
  });
});

describe("En tant qu'employer je veux accéder au formulaire, Afin d'ajouter un employer a la liste", () => {
  test(`ÉTANT DONNÉ que le formulaire est vide, QUAND le bouton Save est cliqué, ALORS le message d'erreur "Veuillez remplir tous les champs !" devrait être affiché`, () => {
    renderWithProvider(<CreateEmployee />);

    fireEvent.click(screen.getByText(/Save/i));
    expect(
      screen.getByText(/Veuillez remplir tous les champs !/i),
    ).toBeInTheDocument();
  });

  test('ÉTANT DONNÉ que le formulaire est rempli correctement, QUAND le bouton Save est cliqué, ALORS une modal avec le message "Employee Created !" devrait être affichée', () => {
    renderWithProvider(<CreateEmployee />);

    fireEvent.input(screen.getByLabelText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.input(screen.getByLabelText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.input(screen.getByLabelText("Date of Birth"), {
      target: { value: "1990-01-01" },
    });
    fireEvent.input(screen.getByLabelText("Start Date"), {
      target: { value: "2023-08-01" },
    });
    fireEvent.input(screen.getByLabelText("Street"), {
      target: { value: "123 Main St" },
    });
    fireEvent.input(screen.getByLabelText("City"), {
      target: { value: "New York" },
    });
    fireEvent.input(screen.getByLabelText("State"), {
      target: { value: "NY" },
    });
    fireEvent.input(screen.getByLabelText("Zip Code"), {
      target: { value: "10001" },
    });
    fireEvent.input(screen.getByLabelText("Department"), {
      target: { value: "sales" },
    });
    fireEvent.click(screen.getByText("Save"));
    const successModal = screen.getByText(/Employee Created !/i);
    expect(successModal).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("close"));
    expect(successModal).not.toBeInTheDocument();
  });
});

describe("En tant qu'employer je navigue entre les différente page de l'application", () => {
  test('ÉTANT DONNÉ que la page createEmployee est rendue, QUAND le bouton List Employees est cliqué, ALORS le titre de la page devrait être "List Employee"', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );
    fireEvent.click(screen.getByText(/List Employees/i));
    expect(screen.getByText(/List Employee/i)).toBeInTheDocument();
  });

  test('ÉTANT DONNÉ que la page createEmployee est rendue, QUAND le bouton List Employees est cliqué, ALORS l\'URL devrait correspondre à "/list"', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );
    fireEvent.click(screen.getByText(/List Employees/i));
    expect(window.location.pathname).toBe("/list");
  });

  test('ÉTANT DONNÉ que la page createEmployee est rendue, QUAND le bouton Create employees est cliqué, ALORS l\'URL devrait correspondre à "/"', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>,
    );
    fireEvent.click(screen.getByText(/Create employees/i));
    expect(window.location.pathname).toBe("/");
  });
});

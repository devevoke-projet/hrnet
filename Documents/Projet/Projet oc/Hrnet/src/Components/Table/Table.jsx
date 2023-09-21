import React, {useEffect, useState} from "react";
import "./Table.css";
import PropTypes from "prop-types";

/**
 *  Table component with sorting functionality
 * @param data - array of objects with data to be displayed
 * @param headers - array of objects with name and data keys
 * @returns {JSX.Element}
 * @constructor
 */
const Table = ({data, headers}) => {
    const [dataEmployee, setDataEmployee] = useState([]);
    const [numberEmployee, setNumberEmployee] = useState(10 || "");
    const [showEmployee, setShowEmployee] = useState(null);
    const [sliceStart, setSliceStart] = useState(0);
    const [page, setPage] = useState(1);
    const [notFoundMessage, setNotFoundMessage] = useState("");

    const [sortConfig, setSortConfig] = useState({
        key: "null",
        direction: "asc",
    });

    const requestSort = (key) => {
        let direction = "asc";
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "asc"
        ) {
            direction = "desc";
        }
        setSortConfig({key, direction});
    };

    const sortedData = () => {
        return !sortConfig ? data : [...data].sort((a, b) =>
            (a[sortConfig.key] ?? '').localeCompare(b[sortConfig.key] ?? '') * (sortConfig.direction === "asc" ? 1 : -1)
        );
    };


    useEffect(() => {
        setDataEmployee(sortedData() && sortedData().slice(0, numberEmployee));
        if (data && data.length === 0) {
            setNotFoundMessage("No results found");
        }
        // affiche le nombre d'employés par page en fonction du nombre total d'employés et du nombre d'employés affichés
        if (data) {
            if (numberEmployee * page > data.length) {
                setShowEmployee(data.length);
            } else {
                setShowEmployee(numberEmployee * page);
            }
        }
    }, [sortConfig, numberEmployee, data]);

    const filterEmployee = (e) => {
        const value = e.target.value.toLowerCase();
        //fonction qui filtre sur des clés génériques
        const filter =
            data &&
            data.filter((item) => {
                return Object.keys(item).some((key) => {
                    const itemValue =
                        typeof item[key] === "string" ? item[key] : String(item[key]);
                    return itemValue.toLowerCase().includes(value);
                });
            });

        if (value === "") {
            const newData = sortedData().slice(sliceStart, numberEmployee);
            const newShowEmployee = numberEmployee;
            const newNotFoundMessage = newData.length === 0 ? "No results found" : "";

            setDataEmployee(newData);
            setShowEmployee(newShowEmployee);
            setNotFoundMessage(newNotFoundMessage);
        } else {
            setShowEmployee(filter.length);
            setDataEmployee(filter);
            setNotFoundMessage(filter.length === 0 ? "No results found" : "");
        }
    };

    // fonction qui permet de changer de page et d'afficher la suite des données
    // en prenant compte du nombre d'employés affichés
    const handlePageChange = (page) => {
        if (page < 1) return;
        if (page > Math.ceil(data.length / numberEmployee)) return;

        setPage(page);
        setSliceStart(numberEmployee * (page - 1));
        setDataEmployee(
            sortedData().slice(numberEmployee * (page - 1), numberEmployee * page),
        );
        // affiche le nombre d'employés par page en fonction du nombre total d'employés et du nombre d'employés affichés
        // si le nombre d'employés par page est supérieur au nombre total d'employés, affiche le nombre total d'employés
        // sinon affiche le nombre d'employés par page
        if (numberEmployee * page > data.length) {
            setShowEmployee(data.length);
        } else {
            setShowEmployee(numberEmployee * page);
        }
    };
    return (
        <div>
            <div className="container-option">
                <div className="select-option">
                    <label htmlFor="number-show"> Show</label>
                    <select
                        id="number-show"
                        name="number-show"
                        data-testid={"numberShow"}
                        value={numberEmployee}
                        onChange={(e) => setNumberEmployee(e.target.value)}
                    >
                        {[10, 25, 50, 100].map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="input-search">
                    <label htmlFor="search-employee"> Search</label>
                    <input
                        id="search-employee"
                        name="search-employee"
                        onChange={filterEmployee}
                        type="search"
                    />
                </div>
            </div>
            <table>
                <thead>
                <tr className="table-head">
                    {headers.map((header, index) => (
                        <th
                            data-testid={header.data}
                            key={index}
                            onClick={() => requestSort(header.data)}
                        >
                            {header.name}
                            {sortConfig.key === header.data ? (
                                <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                            ) : (
                                <span> ↓ </span>
                            )}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {dataEmployee &&
                    dataEmployee.map((item, index) => (
                        <tr key={index}>
                            <td data-testid="arrayData">{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.startDate}</td>
                            <td>{item.department}</td>
                            <td>{item.dateOfBirth}</td>
                            <td>{item.street}</td>
                            <td>{item.city}</td>
                            <td>{item.state}</td>
                            <td>{item.zipCode}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="not-found">
                <p>{notFoundMessage}</p>
            </div>
            <div className="container-pagination">
                <div className="show-pagination">
                    <p>
                        Showing {showEmployee} of {data && data.length} entries
                    </p>
                </div>
                <div className="container-button">
                    <button onClick={() => handlePageChange(page - 1)}>Previous</button>
                    <button onClick={() => handlePageChange(page + 1)}>Next</button>
                </div>
            </div>
        </div>
    );
};
export default Table;

// Props-types for the component
Table.propTypes = {
    data: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
};

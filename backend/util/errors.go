package util

type Errors struct {
	errors []error
}

func (e Errors) Error() string {
	result := ""
	for i := range e.errors {
		result += e.errors[i].Error()
		if i < len(e.errors)-1 {
			result += "\n"
		}
	}
	return result
}

func (e *Errors) Add(err error) {
	e.errors = append(e.errors, err)
}

func (e Errors) Length() int {
	return len(e.errors)
}

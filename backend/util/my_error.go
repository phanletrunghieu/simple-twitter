package util

type MyError struct {
	Raw       error
	ErrorCode int
	HttpCode  int
	Message   string
}

func (e MyError) Error() string {
	return e.Message
}

func NewError(err error, httpCode, errCode int, message string) MyError {
	return MyError{
		Raw:       err,
		ErrorCode: errCode,
		HttpCode:  httpCode,
		Message:   message,
	}
}

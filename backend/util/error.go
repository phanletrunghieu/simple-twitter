package util

import (
	"github.com/vektah/gqlparser/gqlerror"
)

// GQLerror .
func GQLerror(message, code string) *gqlerror.Error {
	return &gqlerror.Error{
		Message: message,
		Extensions: map[string]interface{}{
			"code": code,
		},
	}
}

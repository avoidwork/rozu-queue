# rozu-queue
Offline processing queue for rozu webhook server.

## API
### constructor(channel, port, host)
Takes the redis channel, port & host as parameters, and creates an in RAM queue which can be batched processed with
delays, as well as an easy drain.

### process(n = 1, delay = 0)
Returns a Promise of the data to be processed.

### drain(fn)
Drains the queue and executes an Function against the items as they leave.

## License
Copyright (c) 2015 Jason Mulligan
All Rights Reserved

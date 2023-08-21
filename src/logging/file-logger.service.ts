import { Injectable, LogLevel, Scope } from '@nestjs/common';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

@Injectable({ scope: Scope.DEFAULT })
export class FileLoggerService {
  fileMaxSize: number;
  logDirectory: string;
  defaultCurrentLogFileSize = 0;
  defaultCurrentLogStream: fs.WriteStream | null = null;

  errorCurrentLogFileSize = 0;
  errorCurrentLogStream: fs.WriteStream | null = null;

  constructor() {
    this.fileMaxSize = +process.env.LOG_FILE_MAX_SIZE * 1024 * 1024;
    this.logDirectory = 'logs';
    this.createFolder(path.join(process.cwd(), this.logDirectory));
    this.createDefaultLogFile();
    this.createErrorLogFile();
  }

  public info(message: string) {
    this.log(message, 'log');
  }

  public error(message: string) {
    this.log(message, 'error');
  }

  public warn(message: string) {
    this.log(message, 'warn');
  }

  public debug(message: string) {
    this.log(message, 'debug');
  }

  public verbose(message: string) {
    this.log(message, 'verbose');
  }

  private createDefaultLogFile() {
    const reg = /[:\.]/g;
    const fileTimestamp = new Date().toISOString().replace(reg, '_');
    const logFilename = `log_${fileTimestamp}`;
    const logPath = path.join(process.cwd(), this.logDirectory, logFilename);
    this.defaultCurrentLogStream = fs.createWriteStream(logPath, {
      flags: 'a',
    });

    this.defaultCurrentLogStream.on('error', function (err) {
      console.log('ERROR:' + err);
    });

    this.defaultCurrentLogFileSize = 0;
  }

  private createErrorLogFile() {
    const reg = /[:\.]/g;
    const fileTimestamp = new Date().toISOString().replace(reg, '_');
    const logFilename = `errors_log_${fileTimestamp}`;
    const logPath = path.join(process.cwd(), this.logDirectory, logFilename);
    this.errorCurrentLogStream = fs.createWriteStream(logPath, { flags: 'a' });

    this.errorCurrentLogStream.on('error', function (err) {
      console.log('ERROR:' + err);
    });

    this.errorCurrentLogFileSize = 0;
  }

  private log(message: string, logLevel: LogLevel) {
    const timestamp = new Date().toISOString();
    const template = `${timestamp} ${logLevel.toUpperCase()} ${message} ${
      os.EOL
    }`;

    if (logLevel === 'error') {
      if (this.errorCurrentLogFileSize > this.fileMaxSize) {
        this.errorCurrentLogStream.end();
        this.createErrorLogFile();
      }
      this.errorCurrentLogStream.write(template);
      this.errorCurrentLogFileSize += Buffer.byteLength(template, 'utf8');
    } else {
      if (this.defaultCurrentLogFileSize > this.fileMaxSize) {
        this.defaultCurrentLogStream.end();
        this.createDefaultLogFile();
      }
      this.defaultCurrentLogStream.write(template);
      this.defaultCurrentLogFileSize += Buffer.byteLength(template, 'utf8');
    }
  }

  private createFolder(folderPath: string) {
    const isPathExists = fs.existsSync(folderPath);

    if (isPathExists) {
      return;
    }
    fs.mkdirSync(folderPath);
  }
}

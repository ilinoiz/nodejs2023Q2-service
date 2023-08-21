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
    this.fileMaxSize = +process.env.LOG_FILE_MAX_SIZE_MB * 1024 * 1024;
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
    this.defaultCurrentLogStream = this.createStream('log');
    this.defaultCurrentLogFileSize = 0;
  }

  private createErrorLogFile() {
    this.errorCurrentLogStream = this.createStream('errors_log');
    this.errorCurrentLogFileSize = 0;
  }

  private createStream(fileName: string) {
    const fileNameEscapeRegexp = /[:\.]/g;
    const fileTimestamp = new Date()
      .toISOString()
      .replace(fileNameEscapeRegexp, '_');
    const logFilename = `${fileName}_${fileTimestamp}`;
    const logPath = path.join(process.cwd(), this.logDirectory, logFilename);

    return fs.createWriteStream(logPath, { flags: 'a' });
  }

  private log(message: string, logLevel: LogLevel) {
    const timestamp = new Date().toISOString();
    const template = `${timestamp} ${logLevel.toUpperCase()} ${message} ${
      os.EOL
    }`;

    if (logLevel === 'error') {
      if (this.errorCurrentLogFileSize >= this.fileMaxSize) {
        this.errorCurrentLogStream.end();
        this.createErrorLogFile();
      }
      this.errorCurrentLogStream.write(template);
      this.errorCurrentLogFileSize += Buffer.byteLength(template, 'utf8');
    } else {
      if (this.defaultCurrentLogFileSize >= this.fileMaxSize) {
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
